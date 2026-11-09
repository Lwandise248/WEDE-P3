/* Open Circuit Electrical and Solar — Part 3 interactions (JSQuery). */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('js-ready');
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';
    const motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.body.classList.add('page-entered');
    if (currentFile === 'index.html' && motionOK) document.body.classList.add('home-page');
    document.querySelectorAll('header nav a').forEach((link) => {
        if (link.getAttribute('href') === currentFile) link.setAttribute('aria-current', 'page');
    });

/* Open Circuit Electrical and Solar: interactive Leaflet map (enquiry page).
   Requires Leaflet 1.9.4 to be loaded first. Map tiles: OpenStreetMap. */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('#location-map');
    if (!container || typeof L === 'undefined') return;

    // Approximate centre of Glenwood, Durban. Change these two numbers to move the map.
    const glenwood = [-29.8725, 30.9900];

    const map = L.map(container, { scrollWheelZoom: false }).setView(glenwood, 14);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker(glenwood)
        .addTo(map)
        .bindPopup('<strong>Open Circuit Electrical and Solar</strong><br>Glenwood, Durban')
        .openPopup();

    // Scroll-wheel zoom is off so the page scrolls normally; enable it only while the map is clicked.
    map.on('focus', () => map.scrollWheelZoom.enable());
    map.on('blur', () => map.scrollWheelZoom.disable());

    // Recalculate the map size once the page has finished laying out and animating in.
    window.setTimeout(() => map.invalidateSize(), 600);
    window.addEventListener('resize', () => map.invalidateSize());
});

    // Smooth-scroll only to valid same-page fragments; respect reduced-motion preferences.
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach((link) => {
        link.addEventListener('click', (event) => {
            const fragment = link.getAttribute('href').slice(1);
            let id;
            try { id = decodeURIComponent(fragment); } catch (_) { return; }
            const target = document.getElementById(id);
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({ behavior: motionOK ? 'smooth' : 'auto', block: 'start' });
            history.pushState(null, '', `#${encodeURIComponent(id)}`);
        });
    });
    // Create a clearly labelled illustration when original project photo files are absent.
    document.querySelectorAll('img[src]').forEach((image) => {
        image.addEventListener('error', () => {
            if (image.dataset.placeholderApplied) return;
            image.dataset.placeholderApplied = 'true';
            image.removeAttribute('srcset');
            const picture = image.closest('picture');
            if (picture) picture.querySelectorAll('source').forEach((source) => source.remove());
            const caption = image.closest('figure')?.querySelector('figcaption')?.textContent || image.alt || 'Project photo';
            const safeCaption = caption.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[char]);
            const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480"><rect width="800" height="480" fill="#e8edf2"/><rect x="30" y="30" width="740" height="420" rx="24" fill="#f7f9fb" stroke="#cbd5df" stroke-width="4"/><path d="M400 92 314 238h68l-28 112 130-170h-78l38-88z" fill="#f5a623" stroke="#0b1f3a" stroke-width="9" stroke-linejoin="round"/><text x="400" y="390" text-anchor="middle" font-family="Arial,sans-serif" font-size="23" font-weight="700" fill="#0b1f3a">${safeCaption}</text><text x="400" y="425" text-anchor="middle" font-family="Arial,sans-serif" font-size="15" fill="#5b6b79">ILLUSTRATIVE PLACEHOLDER — replace with a genuine project photo</text></svg>`;
            image.src = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
            if (!image.alt.toLowerCase().includes('placeholder')) image.alt += ' (illustrative placeholder; replace with project photo)';
        });
    });
