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

For GitHub Pages project deployment under `/Tanisten/`:

```bash
npm run build:github
```

GitHub Pages deployment is automated through `.github/workflows/pages.yml`. The workflow runs on pushes to `main`, builds with the `/Tanisten/` base path, copies `dist/index.html` to `dist/404.html` for SPA fallback routing, and publishes the `dist` folder.

After the workflow finishes, the site is available at:

```txt
https://jigerjoock.github.io/Tanisten/
```

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
