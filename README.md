# Open Circuit Electrical and Solar — Website

**Name:** Lwandise Madlala  
**Student number:** ST10487940

A responsive five-page static website for the Open Circuit Electrical and Solar project proposal.

## Pages

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Introduction, services overview, gallery preview, testimonials and dynamic Power Tips |
| About Us | `about.html` | Company story, mission and reasons to choose the business |
| Services | `services.html` | Electrical, installation, solar and backup-power services; interactive FAQ |
| Gallery | `gallery.html` | Project examples with category filters |
| Enquiry | `enquiry.html` | Unified service/general message form, contact details and Glenwood map |

## Project structure

Extract/open this project root as a whole. `index.html` and the `css/` directory must remain at the same level; do not upload or copy only the HTML files. The delivered ZIP places these project files directly at its root so relative stylesheet paths resolve after extraction.

```text
/
├── index.html
├── about.html
├── services.html
├── gallery.html
├── enquiry.html
├── css/style.css
├── images/open-circuit-logo.svg  animated brand mark asset
├── js/site.js
├── js/form-config.js       endpoint/recipient configuration (empty until confirmed)
├── robots.txt
├── _headers              Netlify response security headers
├── tools/generate_sitemap.py  sitemap builder requiring the real site URL
├── screenshots/     responsive evidence, Enquiry page previews and logo-header preview
├── PART3_AUDIT.md   requirement-by-requirement audit and remaining gaps
└── README.md
```

## Part 3 — JavaScript, forms and SEO

A requirement-by-requirement review of the three Part 3 instruction screenshots and Part 2 feedback is recorded in [PART3_AUDIT.md](PART3_AUDIT.md), including items that remain pending because the real photos, recipient, backend or production domain were not supplied.

### JavaScript functionality

- `js/site.js` is a small vanilla JavaScript file loaded with `defer` on all five pages.
- The shared navigation identifies the current page with `aria-current="page"`. Same-page fragment links use smooth scrolling when motion is allowed and fall back to instant scrolling for reduced-motion users.
- The Gallery page can filter projects as **All projects**, **Electrical**, or **Solar & backup**. Its live result count updates after each selection.
- The Gallery has an accessible modal lightbox: select a photo to enlarge it, use Previous/Next or left/right arrow keys to move through the currently visible photos, and close with Escape or the Close button.
- The Services page has a keyboard-operable FAQ using native `<details>` and `<summary>` elements. Answers remain accessible when JavaScript is unavailable.
- Service sections can be searched by words in their headings/content and sorted alphabetically or returned to their featured order. The result count updates as the query changes.
- The Home page includes dynamically rendered Helpful Power Tips from a local JavaScript array; no external API is required.
- All five pages use a coordinated content-entry transition and scroll-triggered section reveals; the Home hero has an additional entrance animation, and interactive cards/controls receive smooth feedback. Animations are disabled or simplified for `prefers-reduced-motion`. Missing source photos are replaced at runtime by clearly labelled illustrative placeholders, not presented as client photographs.
- The Enquiry page contains a Google Maps embed for the general Glenwood, Durban area, plus an external directions/search link. The embedded map displayed blank in the headless test browser; verify map tiles load in the deployed browser. It identifies the neighbourhood only, not a verified business street address.
- Enquiry guidance changes with the selected category and explains that real prices/stock/availability require confirmation; it does not invent costs or promise appointments.
- The unified form uses AJAX `fetch` when a secure HTTPS form endpoint is configured. After the endpoint accepts a submission, the visitor sees an animated thank-you: “Thank you for your enquiry. Your details have been received, and we will contact you as soon as possible.” An actual recipient email can instead be set for a `mailto:` handoff, where the visitor must press Send in their email application.
- `js/form-config.js` intentionally has blank `endpoint` and `recipientEmail` values because no backend, hosted endpoint, or confirmed recipient was provided. Until the site owner configures one, the form explicitly says messages have **not** been sent. Failed endpoint requests also never display the thank-you. No SMTP credential or API secret is exposed in browser code.

### SEO and accessibility

- Each page has a distinct, descriptive title (38–54 characters), meta description (96–129 characters), indexing directive, Open Graph title/description/type, and Twitter summary metadata. Absolute canonical and social URLs are omitted until the real publication origin is confirmed.
- The home page includes JSON-LD structured data for the Electrician business type based on the supplied project. The placeholder phone is intentionally excluded from structured data.
- Added a qualitative keyword map below and used natural service/location phrases in relevant titles, headings, descriptions and page copy. No search-volume or rank claims are made.
- All five pages have a single content H1 plus ordered H2/H3 sections. The five root HTML filenames and existing cross-page navigation provide short, descriptive routes and internal links, including links to the unified Enquiry page for service enquiries and general messages.
- The supplied 528×378 rewiring-service photo is saved as `images/rewiring.jpg` and used on Services with descriptive alternative text. It is presented as a service illustration, not as a verified Open Circuit customer project. Other missing project-photo references still fall back to visibly labelled illustrations. Lazy loading and async decoding are enabled; confirm image-use permission before public launch.
- `robots.txt` permits crawl access. The sitemap generator creates a standards-based `sitemap.xml` for all five pages, including `enquiry.html`, once the actual HTTPS publication origin is supplied. Absolute canonical URLs and a `Sitemap:` directive are intentionally not guessed.
- Added `_headers` for Netlify static hosting with a Content Security Policy, HSTS, anti-framing, MIME-sniffing protection, referrer policy and restricted browser permissions. Other hosts must configure equivalent headers in their own settings; GitHub Pages does not read Netlify `_headers`.
- Off-page SEO cannot be completed by editing a local repo. After launch, the business owner should verify/update its Google Business Profile, keep name/address/phone consistent, request genuine customer reviews, share useful pages via its own social accounts, and earn relevant local/supplier/community links. Do not buy or fabricate backlinks.
- Added an accessible navigation label and current-page state, visible keyboard focus, live status announcements, form autocomplete/input hints, and reduced-motion support.
- No canonical URL or generated `sitemap.xml` is set up because no production domain has been supplied. Run the included generator after the final public URL is known.

### Qualitative keyword map

- **Home:** electrician Durban; electrical repairs Durban; solar installation Durban; backup power Durban; Glenwood electrical contractor.
- **About:** electrical contractor Glenwood; electrician Durban; solar contractor Durban.
- **Services:** electrical repairs Durban; DB board upgrades Durban; solar installation Durban; backup power systems Durban.
- **Gallery:** electrical projects Durban; solar installation gallery Durban; backup power Durban.
- **Enquiry:** service enquiry Durban; electrician enquiry Durban; solar quote Durban; backup power enquiry Durban; contact electrician Glenwood; general message electrical contractor.

These phrases describe the project’s actual services and service area. They are directional content targets, not a claim of measured demand or guaranteed ranking.

### Part 2 feedback and corrections

The supplied Part 2 feedback document records **65/100 (65%)**. It identifies inconsistent CSS application as the main issue: the lecturer reported that styling, typography, layout, decoration, pseudo-classes, and responsive behavior appeared to work only on the Gallery page. The feedback also recommends checking every page rather than relying on a Gallery-only test.

The current project links the same relative `css/style.css` from all five root-level HTML pages. A cross-page audit confirmed that every stylesheet path resolves. Shared font, base, navigation, color, focus/hover, and responsive rules are centralized in this stylesheet. The unified Enquiry page uses the shared form/location layout; its heading and introduction sit above the form and details columns.

This update records the feedback and fixes a real shared-layout issue found during the page audit. Because the source archive already had the stylesheet links on all pages, the current audit cannot establish why only Gallery styling was visible in the lecturer’s earlier submission. Likely causes such as an earlier repository state or previewing a different folder cannot be confirmed from the feedback document. The README therefore distinguishes the confirmed current state from unknown past cause.

#### Part 2 mark breakdown

The feedback document lists: Knowledge (Part 1) **10/10**; External CSS stylesheet **5/10**; Default CSS styling **2/5**; Typography **2/5**; Layout structure **2/5**; Decoration and colour **2/5**; Pseudo-classes **2/10**; Responsive media queries **5/10**; Responsive layout **5/5**; Responsive typography **5/5**; Responsive navigation **5/5**; Responsive images **2/5**; GitHub commits **5/5**; README **5/5**; Changelog **5/5**; References **5/5**. The document’s stated final mark is **65/100**, but these 16 criterion scores add to **67/100**. Both figures are preserved as printed; the discrepancy should be clarified with the lecturer rather than silently changing the mark.

#### Feedback corrections recorded
- **External stylesheet:** confirmed all five HTML pages link to `css/style.css`; checked that it exists and is served at that relative path. The ZIP keeps all five HTML files beside the `css/` folder at archive root.
- **Consistent default styling and typography:** retained shared reset, Montserrat/Open Sans, base colors and spacing in one stylesheet linked site-wide.
- **Layout structure:** corrected Enquiry form/location flex layout so each page title and introduction sit above the form, with shared column layout preserved.
- **Decoration and color:** retained shared navy/amber palette and shared card, table, button, and footer styling.
- **Pseudo-classes:** shared hover/focus/active states cover navigation, links, controls, gallery filters, FAQ summaries, and form buttons.
- **Responsive behavior:** tested every page in Chromium/Playwright at 1280px, 768px and 375px widths. All five loaded the shared CSS, retained the shared navy header and typography, and had no horizontal document overflow at those widths. See the regression checklist and limitations below.

## Changelog

### Part 1 — HTML structure and content
- Created the original site pages using semantic HTML (header, navigation, main, sections, articles, figures, footer, images, table and form). A separate `contact.html` existed earlier; the current Part 3 revision removes it and merges its contact content into `enquiry.html`.
- Recorded the Part 1 mark as 76%; no specific written feedback was provided in the supplied README.

### Part 2 — CSS styling and responsive design
- Added the shared external stylesheet, Google Fonts, CSS reset, typography and site colour palette.
- Built the navigation, service cards, testimonials, gallery, About table, Services layouts and Enquiry form and contact/location columns with Flexbox.
- Added hover, focus and active styles, striped table rows, responsive breakpoints at 768px and 480px, and relative sizing.
- Added a `<picture>`/`srcset`/`sizes` responsive-image example and gallery `<figure>`/`<figcaption>` markup.
- Saved desktop, tablet and mobile screenshots in `screenshots/`.

### Part 3 — JavaScript enhancements, SEO and accessibility
- Reviewed the supplied `css.zip`; adapted restrained hover lift for existing Home/service/gallery cards, an About-table row highlight, image zoom, and button feedback using the Open Circuit navy/amber palette. All new transitions respect reduced-motion users; Quickflow colors, global layout, booking/form styles and mobile-menu rules were not imported.
- Added deferred vanilla JavaScript for current-page navigation state, gallery filters, an accessible keyboard-controlled lightbox, service search/sorting, dynamic Power Tips, exclusive FAQ opening, form checks, and message character count.
- Added Gallery filter controls and categories, a native FAQ on Services, search/sort inputs with a live result count, and dynamically generated Home page tips.
- Added coordinated site-entry transitions on all five pages, a distinct Home intro entrance animation, and staggered IntersectionObserver reveals. The implementation honors `prefers-reduced-motion` and keeps content visible when motion/observer support is unavailable.
- Reviewed the supplied `js.zip`; added its same-page smooth-scroll behavior with a reduced-motion fallback. Its booking form, Quickflow contact details, fake success alert, Enter-key suppression, and duplicate animation/focus/lazy-load/current-page handlers were omitted because they are unrelated, misleading, inaccessible, or already covered by this site’s Part 3 code.
- Added missing-photo fallback illustrations labelled as placeholders so absent client images are not misrepresented as completed work.
- Added the responsive map/search link and location details inside the Enquiry page for the general Glenwood, Durban area, rather than assuming a precise street address.
- Added lazy image loading/async decoding, a crawler-friendly `robots.txt`, Netlify `_headers` security policies, and a sitemap generator that requires the actual HTTPS deployment URL.
- Applied Part 2 feedback by auditing all five HTML pages for the shared stylesheet link, recording the 65/100 mark and each correction here, and fixing full-width heading/introduction placement on form pages.
- Expanded `enquiry.html` to accept service/product/availability/sponsorship enquiries and general organisation messages in one form; removed the separate Contact page and placed its contact details and map in Enquiry. Added category-specific cost/availability guidance, HTML and JavaScript validation, accessible errors and status messages, email-client fallback, and configurable AJAX submission. A success animation and thank-you appear only after a configured endpoint returns success. Endpoint and recipient remain blank until a delivery service is selected; no delivery is claimed while unconfigured.
- Added page-specific titles/descriptions, Open Graph/Twitter metadata, one clear H1 per page, natural Durban/Glenwood keyword targeting, internal navigation and local-business structured data on Home.
- Added keyboard focus styling, navigation labelling, accessible status messages, form autocomplete/input hints and reduced-motion support. A motion-aware animated confirmation appears only when the configured form endpoint confirms receipt.
- Added a custom SVG Open Circuit bolt mark beside the shared site name on all five pages, with a subtle motion-safe CSS float animation and hover/focus glow. Follow-up motion polish added page-entry animation across all routes, a more pronounced Home intro transition.
- Recorded the supplied Part 2 mark and corrective actions, and documented free static-hosting options.
- 2026-11-08 performance refinement: cached each service section's title/search text so typing filters visibility without repeatedly reading and sorting DOM content; service reordering now happens only when the sort selection changes. Scroll-reveal class writes are batched into one animation frame, and Home no longer runs the generic main-container transform at the same time as its dedicated intro transition. Existing reduced-motion behavior and the Home/service/gallery interactions were retained.
- 2026-11-08 animation polish: Home now enters with a coordinated header and hero transition; the Gallery lightbox animates in/out and photo changes receive a subtle fade/scale; FAQ answers and existing interactive controls get restrained transition feedback. All additions honor reduced-motion preferences.
- Added the user-supplied `images/rewiring.jpg` (528×378, 28 KB) to the Electrical Repairs service section with accurate alt text and the existing lazy-load/async-decode behavior. Kept the Home/Gallery rewiring photo references as placeholders because this image was supplied as a service photo, not confirmed evidence of a specific completed job.

## Photos and form limitations

One rewiring-service photo supplied by the user is included at `images/rewiring.jpg` and displayed on the Services page. Its source/provenance as an Open Circuit customer project has not been verified, so it is used only as a service illustration. The custom SVG logo is a brand mark, not a project photo. Other missing project-photo paths are replaced at runtime by visibly labelled SVG illustrations when their requests fail; with JavaScript disabled, those paths remain unavailable. Confirm permission to use the supplied photo and replace remaining placeholders with approved images before public launch; do not present stock imagery as completed client work.

The unified form validates input in the browser and submits via AJAX only after a real HTTPS endpoint is configured; the optional mailto route requires a confirmed recipient and an email application. The provided config is intentionally blank, so no customer data is transmitted by default. Configure and test a trusted endpoint/recipient before accepting real submissions. The supplied project includes a placeholder phone number; confirm the business’s actual number and replace all instances before public launch. The Google Maps view locates the general neighbourhood only, not a verified street address.

## Free static hosting

This project needs no build step. For Netlify, create a free account, choose **Add new site → Deploy manually**, and upload this project folder (or connect its Git repository). For GitHub Pages, push the folder contents to a repository and enable Pages for the chosen branch and root. No public deployment was performed in this update. After selecting a stable domain, add the correct canonical URL and social `og:url`/image values, generate and submit the sitemap, and test the live form integration and site links. On Netlify, deploy the folder with `_headers` in its root so security response headers are applied; verify the resulting CSP permits the intended Google Fonts stylesheet and Google Maps iframe.

## How to view and test locally

From this folder, run:

```sh
python3 -m http.server 8080
```

Then open `http://localhost:8080`. Keep the extracted folder structure intact: each page links to `css/style.css` relative to itself, so the `css` folder must sit beside `index.html`. Review gallery category filters and lightbox keyboard controls, services search/sort, dynamic Power Tips, FAQ controls, unified service/general-message form validation, endpoint/email delivery behavior, the map on Enquiry, reduced-motion behavior and responsive layout at desktop, tablet and mobile widths.

#### Cross-page responsive regression checklist

Open each of `index.html`, `about.html`, `services.html`, `gallery.html` and `enquiry.html` at approximately **1280px desktop**, **768px tablet** and **375px mobile** widths. On every page, check that the shared stylesheet loads, heading/body typography and navy/amber colors are consistent, navigation remains usable, content does not overflow horizontally, and all visible controls retain hover/focus styling. Check page-specific content as well: About table, service cards/FAQ, gallery grid/lightbox, and the unified Enquiry form with its general-message category and map. The restored five-page version was tested in Chromium/Playwright at all three widths (15 route/viewport checks). The shared CSS and logo loaded, pages had no horizontal overflow, and the removed Contact route was absent. The unified form’s general-message and solar-enquiry guidance, optional project area and explicit not-sent state were exercised; the map iframe was confirmed on Enquiry. Service search/sort, gallery filter/lightbox, FAQ and same-page smooth scrolling were also exercised. This is a technical smoke/regression check, not a formal accessibility audit or a Lighthouse/Core Web Vitals report. After the public URL is known, generate the sitemap with:

```sh
python3 tools/generate_sitemap.py https://your-real-site.example
```

Then replace the commented sitemap line in `robots.txt` with that exact sitemap URL. Do not submit the sample command with its example hostname. The actual sitemap and production deployment remain pending until a real domain is selected.

## References

- Google Fonts — Montserrat and Open Sans: https://fonts.google.com
- MDN — CSS Flexible Box Layout: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout
- MDN — Responsive images: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture
- MDN — Media queries: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries
- MDN — Constraint validation: https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation
- MDN — `<details>` element: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details
- Google Search Central — Structured data: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- Google Maps — Maps URLs: https://developers.google.com/maps/documentation/urls
- Schema.org — Electrician: https://schema.org/Electrician
