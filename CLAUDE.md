# Working on Picto

Picto is a static site: plain HTML, CSS and JavaScript, no build step, no dependencies.

## Before you change anything visual

Read `DESIGN.md`. It holds the rules for characters, motion, locations and the map.

After a visual change, update `DESIGN.md` in the same commit:

- If the change alters how things are done in general, edit the matching rule so it stays true. Write it as a general rule.
- Add to "Specific rules" only when the project owner asks for a one-off exception or asks you to record one.
- Add a line to the change log.

## Files

- `index.html`: shell. Bump the `?v=` number on every asset link when you change an asset.
- `styles.css`: design tokens, layout, components.
- `motion.css`: motion tokens and all character, scene and map animation.
- `art/kit.js`, `art/glo.js`, `art/people.js`, `art/scenes.js`, `art/map.js`: inline-SVG artwork, loaded in that order, all adding to `window.ART`.
- `app.js`: data, state, routing, views, scene engine, speech, Glo, the guide.

## Conventions

- Class names are global. Check a new name isn't already used (`grep`) before adding it.
- Animated SVG groups use `transform-box: view-box` with a pixel `transform-origin` in the SVG's own units.
- Don't put a `transform` on a page wrapper that contains a `position: fixed` child.
- Progress is stored in `localStorage` under `picto-v1`.
- Run it with any static server, for example `python -m http.server 8080`.
- The site is published with GitHub Pages from `main`. Ask the owner before pushing.
