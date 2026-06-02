# Tanisten Website

Professional bilingual B2B website for **Tanisten**.

Positioning: **Engineering • Automation • Digital Solutions**

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router

## Routes

- `/` Home
- `/services` Services
- `/industries` Industries
- `/about` About
- `/contact` Contact

## Bilingual Content

The website supports English and German without external translation APIs.

- Translation content lives in `src/i18n/translations.ts`.
- Language state is managed by `src/i18n/LanguageContext.tsx`.
- The language switcher is in the navbar: `EN / DE`.
- Default language is English.
- The selected language is stored in `localStorage` under `tanisten-language`.
- All visible page, navigation, footer, form, card and FAQ text is loaded from translation data.

## Local Development

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Vite will print the local URL in the terminal.

## Production Build

```bash
npm run build
```

The production build is generated in `dist/`.

## Cloudflare Pages Deployment

1. Push this project to a Git repository.
2. In Cloudflare Pages, create a new project and connect the repository.
3. Use these build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Deploy the project.

SPA routing is enabled through `public/_redirects`:

```txt
/* /index.html 200
```
