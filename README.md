# Mambo Tanzania Safaris - Static Website

Plain HTML, CSS and vanilla JavaScript. No build step.

## Files
- `index.html` page structure and SEO metadata
- `styles.css` brand colours and layout
- `script.js` packages, WhatsApp links, mobile menu, Sun Journey sky animation
- `images/` photo folder (see below)

## IMPORTANT: photos still needed
No photographs could be downloaded while building this project. The site shows a
green placeholder with a caption wherever a photo is missing, so nothing looks broken.
Add licensed photos to `images/` using the exact filenames in `images/IMAGES-NEEDED.txt`
and they appear automatically. Do not use OSCA images.

## Editing
- Packages: edit the `P` array at the top of `script.js`.
- WhatsApp number: `WA` in `script.js` (currently 255685645498) and the contact text in `index.html`.
- Prices are "Price on Request" until you provide official prices.

## Deploy
Upload the folder to GitHub, then connect it to Netlify or Cloudflare Pages
(no build command, publish directory is the root).

## Sun Journey
Scroll progress drives sky colour, sun, moon and stars through one requestAnimationFrame
handler. Layers ignore clicks, and star twinkle is disabled for users who prefer reduced motion.

## Destinations from the OSCA reference
Tarangire, Serengeti, Ngorongoro, Lake Manyara, Mkomazi, Mikumi, Nyerere, Udzungwa, Ruaha,
six Kilimanjaro routes, five Zanzibar experiences and five cultural experiences are all included.
