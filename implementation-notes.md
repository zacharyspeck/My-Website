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

---

# Cosmetic pass (branch cosmetic-pass)

1. **Title orphan fixed with `text-wrap: balance`** on `.prose-content h1` (globals.css). Title text unchanged; the browser now balances the two lines. Older browsers that lack support simply keep the previous wrapping.

2. **Figure titles/captions rewritten as plain period-only sentences** (no parentheses, colons, semicolons, or em dashes in rendered caption/title text; ± × = % kept where they state values). NOTE, deliberate conflict resolution: the pass@k title previously carried the originally-required exact phrase "best-of-4, k=4; all-5-exact for Task B; on the 100 hard-band items", which contains semicolons. The newer no-semicolon instruction was applied instead; every fact (k=4, best-of-4, all-5-exact for Task B, 100 hard-band items) is preserved in sentence form. In-chart axis/tick labels (e.g. "(untrained)", "strict exact-match %") are chart labels, not captions, and were left alone.

3. **Study-design arrow recentered**: the arrow into the exam box now descends at x=253, the horizontal center of the 2×2 grid (grid spans x=96 to x=410). Student boxes and exam box untouched.

4. **Homepage removals**: Substack link removed from the footer (footer is now Twitter · LinkedIn · GitHub · Email). From the Other section: "Stephen King novels" (expandable item), "Vinyl Collection ($30K)", and "Coffee (ex-barista)" removed; Rainbow Six Siege, Solo hiking, Live music, Working out kept. Substack existed nowhere else in the codebase (grepped).

Re-verified after all changes: build passes; rendered captions contain no forbidden punctuation; all 30 chart value labels still exactly match the locked data; prose verbatim check PASS; 21→21 links PASS.

Cosmetic files touched: `app/globals.css`, `app/page.tsx`, `app/writing/the-bottleneck-to-the-bottleneck/figures.tsx`, `implementation-notes.md`.

---

# Per-field figure (branch add-fields-figure)

New component `TaskBFieldsFigure` in `figures.tsx` — Task B, hard band, per-field strict % for company, founders, valuation, round, raise. Locked data (research repo commit 106da8c) transcribed verbatim; verified by decoding the built SVG's bar geometry back into values and matching all 25 against the locked table.

Judgment calls, conservative and logged:
1. **Display order within each field group**: baseline, then the two easy-only conditions, then the two easy+hard conditions (the locked list order is baseline / strict·easy / strict·easy+hard / loose·easy / loose·easy+hard). Values untouched; ordering only, so the task-dial lift reads side by side.
2. **No per-bar numeric labels**: 25 bars at this width cannot carry the sibling charts' value labels without overlapping; the chart reads by gridlines, whiskers, and legend instead. Exact numbers live in the aria-label for screen readers.
3. **Colors**: easy-only pair in the muted-gray family (solid and 45% opacity), easy+hard pair in the link-blue family (solid and 45%), baseline dashed fg outline with no whisker. Whiskers only where std > 0 (company row and the founders strict·easy+hard cell have std 0.0 and correctly get none).
4. **Placement (approved by Zach)**: immediately after the "Looking at Task B, …" paragraph and before the "As I previously touched on, I measured two other KPIs…" paragraph. Only the figure reference and its import were added to page.mdx; prose untouched.

Verified with the preview insertion: build passes; other figures' 30 value labels byte-identical; prose verbatim check PASS; 21→21 links PASS; caption punctuation rules hold and all required caption sentences present.
