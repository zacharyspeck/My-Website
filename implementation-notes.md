# Implementation notes — "The Bottleneck to the Bottleneck" (branch add-bottleneck-study)

Deviations / judgment calls from the approved plan, with reasons. Conservative option taken in each case.

1. **Google Docs export merged some visual paragraphs into one `<p>` separated by `<br>` tags** (e.g., the post-training paragraph, image1, and the "RL is not really a new concept" paragraph were one `<p>`). The converter splits at `<br>`/image boundaries so the page shows the same paragraph breaks the doc did. No wording touched.

2. **One italic span in the source starts at a comma** ("I then thought to myself*, what would happen…*"). Markdown cannot open emphasis directly before a comma, so the italic marker was shifted past ", " — wording byte-identical, italics now start at "what". Visual difference: the comma itself is no longer italic (indistinguishable in serif).

3. **Second early screenshot (image1.png)**: per approved plan, V1 replaces both early diagram screenshots and sits at the first one's position; the second screenshot was removed with all surrounding prose kept intact.

4. **Redirect unwrapping** (approved): all 21 links unwrapped from `google.com/url?q=…` to their real destinations; anchor text unchanged; count verified 21 → 21.

5. **Headings**: the doc styles headings as bold 14pt runs; converted to `##` without doubled `**…**` (the site's heading style already carries the weight). Title kept verbatim in full as the page `# h1`; the doc's date line ("July 8th, 2026") and byline ("Zachary Speck") kept as in the doc.

6. **Homepage-list title and meta description are the only authored text** (called out for review in the change report): list title "The Bottleneck to the Bottleneck"; meta description in `page.mdx`'s `export const metadata`.

7. **V4 placement**: inserted immediately *before* the "Looking at Task B, …" paragraph (mirroring V3, which precedes the Task A discussion), so the numbers the paragraph cites are already on screen.

8. **V2 arrows**: four per-cell arrows into the exam box would cross through the bottom-row cells at this column layout; used one converging arrow labeled "all 4 students" instead. Same meaning, cleaner at phone width.

9. **Homepage date quirk confirmed and worked around locally**: `lib/getWritingPosts.ts` formats dates in the build machine's timezone, so a bare `date: 2026-07-08` rendered as "July 7, 2026" when building in Arizona (UTC-7). Fixed only in this post's frontmatter with a noon-UTC timestamp (`2026-07-08T12:00:00`), which renders "July 8, 2026" in any build timezone from UTC-11 to UTC+12. Shared code untouched; existing posts left as they are.

10. **Duplicate date/byline caught and removed**: the first assembly emitted the doc's date and byline twice (once from the page header, once from the converted body). The word-level verbatim check caught it; the body's copy is the one kept.

Files touched (complete list):
- `app/writing/the-bottleneck-to-the-bottleneck/page.mdx` (new)
- `app/writing/the-bottleneck-to-the-bottleneck/figures.tsx` (new)
- `app/page.tsx` (footer socials row only: added GitHub)
- `implementation-notes.md` (this file)
