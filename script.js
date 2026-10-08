/* ==========================================================
   Chalkline – shop logic (vanilla JS, no build step)
   1. Product data
   2. Helpers
   3. Product grid (search, category filter, sort)
   4. Cart (add, change quantity, remove, saved in the browser)
   ========================================================== */

"use strict";

/* ---------- 1. Product data ----------
   `type` picks the garment drawing, `color` is its fill.
   To use real photos instead, add an `image` field and swap the
   drawing in createArt() for an <img>. */

const products = [
  { id: "tee-white",    name: "Everyday Tee",      category: "Tops",      type: "tee",     color: "#f2f0ea", colorName: "Chalk",     price: 24, sizes: ["XS", "S", "M", "L", "XL"] },
  { id: "tee-green",    name: "Everyday Tee",      category: "Tops",      type: "tee",     color: "#5f7d6a", colorName: "Sage",      price: 24, sizes: ["XS", "S", "M", "L", "XL"] },
  { id: "hoodie-navy",  name: "Heavyweight Hoodie", category: "Tops",     type: "hoodie",  color: "#26354f", colorName: "Navy",      price: 68, sizes: ["S", "M", "L", "XL"] },
  { id: "hoodie-rust",  name: "Heavyweight Hoodie", category: "Tops",     type: "hoodie",  color: "#b4573a", colorName: "Rust",      price: 68, sizes: ["S", "M", "L", "XL"] },
  { id: "pants-sand",   name: "Straight Trousers", category: "Bottoms",   type: "pants",   color: "#cdb893", colorName: "Sand",      price: 59, sizes: ["28", "30", "32", "34", "36"] },
  { id: "pants-black",  name: "Straight Trousers", category: "Bottoms",   type: "pants",   color: "#2a2d2c", colorName: "Charcoal",  price: 59, sizes: ["28", "30", "32", "34", "36"] },
  { id: "jacket-olive", name: "Field Jacket",      category: "Outerwear", type: "jacket",  color: "#6b6f45", colorName: "Olive",     price: 119, sizes: ["S", "M", "L", "XL"] },
  { id: "jacket-ink",   name: "Field Jacket",      category: "Outerwear", type: "jacket",  color: "#1f2b3d", colorName: "Ink",       price: 119, sizes: ["S", "M", "L", "XL"] }
];

/* ---------- 2. Helpers ---------- */

// Change "USD" / "en-US" to switch currency formatting
const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

// Shorthand for creating an element with optional class and text
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

// Simple garment outlines drawn as SVG paths (120 x 140 viewBox)
const SHAPES = {
  tee:    "M30 20 L50 12 Q60 26 70 12 L90 20 L110 46 L94 56 L86 46 L86 126 L34 126 L34 46 L26 56 L10 46 Z",
  hoodie: "M32 26 L48 14 Q60 34 72 14 L88 26 L112 104 L96 110 L86 74 L86 128 L34 128 L34 74 L24 110 L8 104 Z",
  pants:  "M36 10 H84 L92 130 H66 L60 56 L54 130 H28 Z",
  jacket: "M30 18 L48 10 L60 24 L72 10 L90 18 L114 104 L98 110 L88 60 L88 128 L32 128 L32 60 L22 110 L6 104 Z"
};

// Build the SVG drawing for one product
function createArt(product) {
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("viewBox", "0 0 120 140");
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", `${product.colorName} ${product.name}`);

  const body = document.createElementNS(ns, "path");
  body.setAttribute("d", SHAPES[product.type]);
  body.setAttribute("fill", product.color);
  body.setAttribute("stroke", "rgba(0,0,0,0.25)");
  body.setAttribute("stroke-width", "1.5");
  body.setAttribute("stroke-linejoin", "round");
  svg.appendChild(body);

  // Small detail lines so each garment reads as itself
  const detail = document.createElementNS(ns, "path");
  const details = {
    tee: "M50 12 Q60 26 70 12",
    hoodie: "M48 14 Q60 -2 72 14 M60 34 V70",
    pants: "M60 56 V10",
    jacket: "M60 24 V128"
  };
  detail.setAttribute("d", details[product.type]);
  detail.setAttribute("fill", "none");
  detail.setAttribute("stroke", "rgba(0,0,0,0.3)");
  detail.setAttribute("stroke-width", "1.5");
  detail.setAttribute("stroke-dasharray", "3 3"); // a stitched look
  svg.appendChild(detail);

  return svg;
}

/* ---------- 3. Product grid ---------- */

const grid = document.getElementById("product-grid");
const emptyState = document.getElementById("empty-state");
const resultCount = document.getElementById("result-count");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");
const categoryBox = document.getElementById("categories");

let activeCategory = "All";

// Build one product card
function createCard(product) {
  const card = el("article", "card");

  const art = el("div", "art");
  art.appendChild(createArt(product));

  const body = el("div", "card-body");
  const title = el("h3", "", product.name);
  const color = el("p", "color-name", product.colorName);
  const price = el("p", "price", money.format(product.price));

  // Size picker + add button
  const buy = el("div", "buy");
  const sizeSelect = el("select");
  sizeSelect.setAttribute("aria-label", `Size for ${product.colorName} ${product.name}`);
  product.sizes.forEach((s) => sizeSelect.appendChild(new Option(s, s)));

  const addBtn = el("button", "btn btn-primary", "Add");
  addBtn.type = "button";
  addBtn.setAttribute("aria-label", `Add ${product.colorName} ${product.name} to cart`);
  addBtn.addEventListener("click", () => addToCart(product.id, sizeSelect.value));

  buy.append(sizeSelect, addBtn);
  body.append(title, color, price, buy);
  card.append(art, body);
  return card;
}

// Apply search, category and sort, then redraw
function renderProducts() {
  const q = searchInput.value.trim().toLowerCase();

  let list = products.filter((p) => {
    const inCategory = activeCategory === "All" || p.category === activeCategory;
    const matches = !q || [p.name, p.colorName, p.category].join(" ").toLowerCase().includes(q);
    return inCategory && matches;
  });

  const sorters = {
    "price-asc": (a, b) => a.price - b.price,
    "price-desc": (a, b) => b.price - a.price,
    name: (a, b) => a.name.localeCompare(b.name)
  };
  if (sorters[sortSelect.value]) list = [...list].sort(sorters[sortSelect.value]);

  grid.replaceChildren(...list.map(createCard));
  emptyState.hidden = list.length > 0;
  resultCount.textContent = list.length === 1 ? "1 item" : `${list.length} items`;
}

// Category chips are generated from the data
function renderCategories() {
  const names = ["All", ...new Set(products.map((p) => p.category))];
  categoryBox.replaceChildren(
    ...names.map((name) => {
      const chip = el("button", "chip", name);
      chip.type = "button";
      chip.setAttribute("aria-pressed", String(name === activeCategory));
      chip.addEventListener("click", () => {
        activeCategory = name;
        renderCategories();
        renderProducts();
      });
      return chip;
    })
  );
}

searchInput.addEventListener("input", renderProducts);
sortSelect.addEventListener("change", renderProducts);

/* ---------- 4. Cart ---------- */

const CART_KEY = "chalkline-cart";

const cartDialog = document.getElementById("cart");
const cartList = document.getElementById("cart-items");
const cartEmpty = document.getElementById("cart-empty");
const cartCount = document.getElementById("cart-count");
const cartSubtotal = document.getElementById("cart-subtotal");
const checkoutBtn = document.getElementById("checkout");
const checkoutMsg = document.getElementById("checkout-msg");

// Each cart line is { id, size, qty }. Saved in localStorage so it survives reloads.
let cart = loadCart();

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch {
    /* storage unavailable (private mode): cart still works for this visit */
  }
}

function addToCart(id, size) {
  const line = cart.find((l) => l.id === id && l.size === size);
  if (line) line.qty += 1;
  else cart.push({ id, size, qty: 1 });
  updateCart();
  cartDialog.showModal(); // show the cart so the person sees the item landed
}

function changeQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  updateCart();
}

function removeLine(index) {
  cart.splice(index, 1);
  updateCart();
}

// Redraw the cart list, count and subtotal
function updateCart() {
  saveCart();
  checkoutMsg.textContent = "";

  let items = 0;
  let subtotal = 0;

  const rows = cart.map((line, index) => {
    const product = products.find((p) => p.id === line.id);
    items += line.qty;
    subtotal += product.price * line.qty;

    const row = el("li", "cart-item");

    const info = el("div");
    info.append(
      el("div", "name", product.name),
      el("div", "meta", `${product.colorName}, size ${line.size}`)
    );

    const qty = el("div", "qty");
    const minus = el("button", "", "−");
    minus.type = "button";
    minus.setAttribute("aria-label", `One less ${product.name}`);
    minus.addEventListener("click", () => changeQty(index, -1));

    const plus = el("button", "", "+");
    plus.type = "button";
    plus.setAttribute("aria-label", `One more ${product.name}`);
    plus.addEventListener("click", () => changeQty(index, 1));

    const remove = el("button", "remove", "Remove");
    remove.type = "button";
    remove.addEventListener("click", () => removeLine(index));

    qty.append(minus, el("span", "", String(line.qty)), plus, remove);
    info.appendChild(qty);

    row.append(info, el("div", "line-price", money.format(product.price * line.qty)));
    return row;
  });

  cartList.replaceChildren(...rows);
  cartEmpty.hidden = cart.length > 0;
  checkoutBtn.disabled = cart.length === 0;
  cartCount.textContent = items;
  cartSubtotal.textContent = money.format(subtotal);
}

document.getElementById("cart-open").addEventListener("click", () => cartDialog.showModal());
document.getElementById("cart-close").addEventListener("click", () => cartDialog.close());

// Click on the dark backdrop closes the drawer
cartDialog.addEventListener("click", (event) => {
  if (event.target === cartDialog) cartDialog.close();
});

/* Checkout is a placeholder. To take real payments, send `cart` to your
   server or a hosted checkout (Stripe Checkout, Shopify Buy Button, etc.). */
checkoutBtn.addEventListener("click", () => {
  checkoutMsg.textContent = "Checkout isn't connected yet. See the comment in script.js to add payments.";
});

/* ---------- Start ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
renderCategories();
renderProducts();
updateCart();
