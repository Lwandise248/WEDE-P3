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

    // Cache searchable text/titles once; typing only toggles visibility, while sorting reorders once.
    const serviceSections = [...document.querySelectorAll('#services-main > section[id]:not(#service-faq)')];
    const searchField = document.querySelector('#service-search');
    const sortField = document.querySelector('#service-sort');
    const resultLabel = document.querySelector('#service-results');
    if (serviceSections.length && searchField && sortField) {
        const featuredOrder = serviceSections.map((section) => ({
            section,
            title: section.querySelector('h2, h3')?.textContent.trim() || '',
            searchText: section.textContent.toLowerCase()
        }));
        const alphabeticalOrder = [...featuredOrder].sort((a, b) => a.title.localeCompare(b.title));
        let appliedOrder = featuredOrder;
        const applyVisibility = () => {
            const query = searchField.value.trim().toLowerCase();
            let shown = 0;
            appliedOrder.forEach(({ section, searchText }) => {
                const matches = searchText.includes(query);
                section.hidden = !matches;
                if (matches) shown += 1;
            });
            if (resultLabel) resultLabel.textContent = `Showing ${shown} of ${appliedOrder.length} ${appliedOrder.length === 1 ? 'service' : 'services'}.`;
        };
        const applySort = () => {
            const nextOrder = sortField.value === 'az' ? alphabeticalOrder : featuredOrder;
            if (nextOrder !== appliedOrder) {
                const fragment = document.createDocumentFragment();
                nextOrder.forEach(({ section }) => fragment.append(section));
                const faq = document.querySelector('#service-faq');
                if (faq) faq.parentNode.insertBefore(fragment, faq);
                appliedOrder = nextOrder;
            }
            applyVisibility();
        };
        searchField.addEventListener('input', applyVisibility);
        sortField.addEventListener('change', applySort);
    }

    // Dynamically render helpful content from a local data array (no external API needed).
    const tipsHost = document.querySelector('#tips-list');
    if (tipsHost) {
        const tips = [
            { title: 'Know what needs power', body: 'List the essential lights, appliances and devices you want to keep running before discussing a backup system.' },
            { title: 'Take note of repeat faults', body: 'Record which breaker trips, when it happens and any affected rooms; those details can help an electrician investigate.' },
            { title: 'Plan for safe access', body: 'Keep the distribution board and work area clear so an electrician can inspect and work safely.' }
        ];
        const fragment = document.createDocumentFragment();
        tips.forEach((tip) => {
            const article = document.createElement('article');
            article.className = 'tip-card reveal';
            const heading = document.createElement('h3');
            heading.textContent = tip.title;
            const paragraph = document.createElement('p');
            paragraph.textContent = tip.body;
            article.append(heading, paragraph);
            fragment.append(article);
        });
        tipsHost.replaceChildren(fragment);
    }

    // Gallery filters and live result count.
    const gallery = document.querySelector('#gallery');
    const filterButtons = document.querySelectorAll('[data-gallery-filter]');
    if (gallery && filterButtons.length) {
        const figures = [...gallery.querySelectorAll('figure[data-category]')];
        filterButtons.forEach((button) => button.addEventListener('click', () => {
            const selected = button.dataset.galleryFilter;
            filterButtons.forEach((item) => {
                const active = item === button;
                item.classList.toggle('is-active', active);
                item.setAttribute('aria-pressed', String(active));
            });
            figures.forEach((figure) => { figure.hidden = selected !== 'all' && figure.dataset.category !== selected; });
            const count = figures.filter((figure) => !figure.hidden).length;
            const status = document.querySelector('#gallery-status');
            if (status) status.textContent = `${count} ${count === 1 ? 'project' : 'projects'} shown.`;
        }));
    }

    // Accessible image lightbox supports buttons, Escape, and left/right arrow keys.
    const dialog = document.querySelector('#gallery-lightbox');
    if (dialog && gallery) {
        const photoFigures = [...gallery.querySelectorAll('figure[data-category]')];
        const largeImage = dialog.querySelector('#lightbox-image');
        const caption = dialog.querySelector('#lightbox-caption');
        let activeIndex = 0;
        let opener = null;
        let closeTimer = 0;
        let isClosing = false;
        const closeLightbox = () => {
            if (!dialog.open || isClosing) return;
            if (!motionOK) { dialog.close(); return; }
            isClosing = true;
            dialog.classList.add('is-closing');
            closeTimer = window.setTimeout(() => {
                if (dialog.open) dialog.close();
            }, 240);
        };
        const visibleFigures = () => photoFigures.filter((figure) => !figure.hidden);
        const showPhoto = (index) => {
            const visible = visibleFigures();
            if (!visible.length) return;
            activeIndex = (index + visible.length) % visible.length;
            const figure = visible[activeIndex];
            const image = figure.querySelector('img');
            const changedPhoto = dialog.open && largeImage.src && largeImage.src !== image.src;
            largeImage.src = image.src;
            largeImage.alt = image.alt;
            caption.textContent = `${figure.querySelector('figcaption')?.textContent || image.alt} — ${activeIndex + 1} of ${visible.length}`;
            if (changedPhoto && motionOK && typeof largeImage.animate === 'function') {
                largeImage.animate(
                    [{ opacity: 0.55, transform: 'scale(0.985)' }, { opacity: 1, transform: 'scale(1)' }],
                    { duration: 220, easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)' }
                );
            }
        };
        photoFigures.forEach((figure, index) => {
            const image = figure.querySelector('img');
            image.tabIndex = 0;
            image.setAttribute('role', 'button');
            image.setAttribute('aria-label', `Enlarge: ${figure.querySelector('figcaption')?.textContent || image.alt}`);
            const open = () => {
                opener = image;
                showPhoto(visibleFigures().indexOf(figure));
                if (!dialog.open) dialog.showModal();
                dialog.querySelector('#lightbox-close').focus();
            };
            image.addEventListener('click', open);
            image.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); }
            });
        });
        dialog.querySelector('#lightbox-close').addEventListener('click', closeLightbox);
        dialog.querySelector('#lightbox-prev').addEventListener('click', () => showPhoto(activeIndex - 1));
        dialog.querySelector('#lightbox-next').addEventListener('click', () => showPhoto(activeIndex + 1));
        dialog.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') showPhoto(activeIndex - 1);
            if (event.key === 'ArrowRight') showPhoto(activeIndex + 1);
        });
        dialog.addEventListener('cancel', (event) => { event.preventDefault(); closeLightbox(); });
        dialog.addEventListener('click', (event) => { if (event.target === dialog) closeLightbox(); });
        dialog.addEventListener('close', () => {
            window.clearTimeout(closeTimer);
            dialog.classList.remove('is-closing');
            isClosing = false;
            if (opener) opener.focus();
        });
    }

    // Native details remain functional without JS; when JS runs, keep one FAQ open at a time.
    const faqItems = document.querySelectorAll('#service-faq details');
    faqItems.forEach((item) => item.addEventListener('toggle', () => {
        if (item.open) faqItems.forEach((other) => { if (other !== item) other.open = false; });
    }));

    // Shared client-side validation and delivery for general messages and service enquiries.
    const serviceGuidance = {
        'electrical-repairs': 'Electrical repair costs depend on the fault, access and parts needed; diagnosis is required before a reliable quote.',
        installation: 'Installation and DB-board costs depend on the site, circuits and compliance work; an assessment is needed for an accurate quote.',
        solar: 'Solar system cost and availability depend on energy use, roof/site conditions and equipment choice; the team must assess your requirements.',
        backup: 'Backup-power costs depend on which loads you need to run and for how long; system sizing should be confirmed after discussing your needs.',
        product: 'Product pricing and stock availability can change. Ask for a current quote and confirmation before making a purchase decision.',
        sponsorship: 'Sponsorship or volunteer requests need to be reviewed individually; include the organisation, dates and support requested.',
        other: 'Please include the work location and the outcome you are looking for so the team can advise on next steps.'
    };
    const config = window.OPEN_CIRCUIT_FORM_CONFIG || {};
    document.querySelectorAll('form[data-form-kind]').forEach((form) => {
        const kind = form.dataset.formKind;
        const isEnquiry = kind === 'enquiry';
        const phone = form.querySelector('[type="tel"]');
        const message = form.querySelector('textarea[name="message"]');
        const status = form.querySelector('.form-status');
        const response = document.querySelector('#enquiry-response');
        const counter = document.querySelector(isEnquiry ? '#enquiry-message-count' : '#message-count');
        const counterUpdate = () => { if (counter && message) counter.textContent = `${message.value.length}/${isEnquiry ? 1000 : 500} characters`; };
        if (message && counter) message.addEventListener('input', counterUpdate);
        counterUpdate();

        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            if (status) { status.textContent = ''; status.className = 'form-status'; }
            if (response) { response.hidden = true; response.textContent = ''; }
            if (phone) {
                phone.setCustomValidity('');
                const normalized = phone.value.replace(/[\s()-]/g, '');
                if (normalized && !/^(?:(?:\+27|0027)\d{9}|0\d{9})$/.test(normalized)) {
                    phone.setCustomValidity('Enter a valid South African number, for example 082 123 4567 or +27 82 123 4567.');
                    phone.reportValidity(); phone.focus(); return;
                }
            }
            if (message && message.value.trim().length < 10) {
                message.setCustomValidity('Please enter at least 10 characters so we can understand your message.');
                message.reportValidity(); message.focus(); return;
            }
            if (message) message.setCustomValidity('');
            if (!form.reportValidity()) return;

            const categoryField = form.querySelector('[name="category"]');
            const category = categoryField?.value || 'other';
            if (isEnquiry && response) {
                if (category === 'general') {
                    response.textContent = 'General message selected. Please include enough detail for the team to understand how they can help; this is not a service quote.';
                } else {
                    const guidance = serviceGuidance[category] || serviceGuidance.other;
                    response.textContent = `Enquiry guidance: ${guidance} This is general guidance, not a quote or a confirmation of stock or appointment availability.`;
                }
                response.hidden = false;
            }

            // Google Forms delivery: posts to the form's formResponse URL in the background.
