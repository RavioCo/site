# Image assets

Folders: `campaign`, `editorial`, `craftsmanship`, `polo`, `tshirts`, `denim`, `twill`, `linen`, `sweatshirts`, `hoodies`.

Product folders hold three views per product (`1` front, `2` fabric detail, `3` back). Slots are declared in `src/lib/images.ts`.
Workflow: originals -> `/asset-source/<folder>/` -> `npm run images` -> set `src`/`srcSet` in `src/lib/images.ts`.
Only mark an image `verified` if it is a genuine RAVIO photograph of a real RAVIO product.
