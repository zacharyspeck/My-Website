# zacharyspeck.com

Personal website built with Next.js 14, Tailwind CSS, and MDX. Deploys to Cloudflare Pages as a fully static export.

## Adding a Writing Piece

1. Create a new directory under `app/writing/` named after the post's URL slug:
   ```
   app/writing/my-essay-title/
   ```

2. Add `page.mdx` inside it with this frontmatter at the top:
   ```mdx
   ---
   title: My Essay Title
   date: 2025-06-01
   ---

   Your essay content goes here in Markdown.
   ```

3. Run `npm run build` (or push to Cloudflare Pages). The post will appear automatically in the Writing section on the homepage, sorted newest first, and will be live at `/writing/my-essay-title/`.

## Local Development

```bash
npm install
npm run dev
```

## Deploy to Cloudflare Pages

1. Push this repo to GitHub.
2. In the Cloudflare Pages dashboard, connect the repo and set:
   - **Build command:** `npm run build`
   - **Output directory:** `out`
   - **Node.js version:** 20
3. Deploy. Every push to `main` triggers a new build automatically.

To deploy manually from the CLI using Wrangler:

```bash
npm run build
npx wrangler pages deploy out --project-name=zacharyspeck-com
```
