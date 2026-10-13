# Portfolio — Luiz Gomes

Static site (HTML + CSS + JS, no build step), bilingual EN (default) / PT.

- `index.html` — page structure
- `css/style.css` — styles (light + dark)
- `js/i18n.js` — **all copy in EN and PT**, plus the design gallery list (`CASES`)
- `js/main.js` — language/theme toggles, gallery, lightbox, animations (GSAP + ScrollTrigger + Lenis in `js/vendor/`)
- `assets/img/` — cut-out portrait, Fusion Clinic device screens, share image
- `assets/work/` — design pieces (`<slug>-01.jpg`, `-02.jpg`…)

Language: `?lang=pt` or the EN/PT switch in the nav (remembered in the browser).

To add a design project: put images in `assets/work/<slug>-0N.jpg` and add an entry to `CASES` in `js/i18n.js`.
