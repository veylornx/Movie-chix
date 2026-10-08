import type { Config } from 'tailwindcss';
export default { darkMode:'class', content:['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}','./data/**/*.{ts,tsx}'], theme:{extend:{fontFamily:{sans:['var(--font-inter)']},colors:{accent:'#4da3ff'}}}, plugins:[] } satisfies Config;
