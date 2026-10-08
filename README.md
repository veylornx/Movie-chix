# Premium Full-Stack Developer Portfolio

## Run locally
1. `npm install`
2. Copy `.env.example` to `.env.local` and update values.
3. `npm run dev`
4. Open `http://localhost:3000`

## Customize
Edit **`data/portfolio.ts`** for your name, bio, stats, social links, skills, projects, experience, services, stack, and testimonials. Replace `public/profile-placeholder.svg` with your photo and add `public/resume.pdf`.

## Contact form
`app/api/contact/route.ts` validates and rate-limits submissions. It currently logs validated submissions server-side so no fake email delivery is claimed. For production email delivery, connect a provider such as Resend/SMTP using server-only environment variables in `.env.local`.

## Production notes
- Add a real domain in `NEXT_PUBLIC_SITE_URL`.
- Replace placeholder links and content.
- Add a real favicon/OG image if desired.
- For multi-instance deployments, replace the in-memory rate limiter with Redis/KV or an edge-compatible provider.
- Run `npm run build` before deployment.
