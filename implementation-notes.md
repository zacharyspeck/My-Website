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

---

# Polish pass (branch polish-writing)

1. **List markers restored via CSS, not page.mdx.** The MDX already contained proper `-` and `1.` lists; Tailwind's base reset (`list-style: none`) was hiding the markers on all essay pages. Added `.prose-content ul { list-style: disc }` and `.prose-content ol { list-style: decimal }` to `app/globals.css`. Prose untouched; verbatim check re-run: PASS. Side effect (in scope, site-wide writing polish): the numbered list in "Where Sunlight Pays" gets its visible numbers back too.

2. **Writing column widened 660px → 760px** via a new `maxWidth.reading` token used only by `app/writing/layout.tsx`. Homepage stays at 660px. Below 760px the column is fluid (max-width only), so phones are unaffected.

3. **Em dashes removed from figure titles/captions** in `figures.tsx`, replaced with period/comma/semicolon per instruction. The pass@k title's required phrase "best-of-4, k=4; all-5-exact for Task B; on the 100 hard-band items" is intact (its leading em dash became a semicolon). Three em dashes remain in code comments only — never rendered.

4. **Legend clipping fixed layout-only**: legend swatches/text moved from x=252/268/344/360 to x=230/246/326/342 inside the same 420-unit viewBox ("hard band" previously overran the right edge in the site's mono font). Verified: all 30 value labels in the built page still exactly match the locked data; bar geometry unchanged.

5. **Prime Intellect environment links**: Zach chose option (a) — a small muted mono line under the byline, above the divider: "Published environments: vc-deal-math · vc-deal-extraction", both opening in new tabs. The inline parenthetical (option b) was rejected; prose untouched. Both URLs verified resolving (HTTP 200). The verbatim check now explicitly excludes this one approved line.

Polish files touched: `app/globals.css`, `tailwind.config.ts`, `app/writing/layout.tsx`, `app/writing/the-bottleneck-to-the-bottleneck/figures.tsx`, `implementation-notes.md`.
