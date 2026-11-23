/* Интерактивная презентация: переходы, клавиши, свайпы, обзор, галерея, карта, калькулятор. */
(function () {
    'use strict';

    const deck = document.getElementById('deck');
    const slides = Array.from(deck.querySelectorAll('.slide'));
    const $ = (id) => document.getElementById(id);
    const ui = {
        cur: $('cur'), total: $('total'), title: $('slide-title'),
        prev: $('prev'), next: $('next'), bar: $('progress-bar'), hint: $('keys-hint'),
        overview: $('overview'), grid: $('overview-grid'),
        lightbox: $('lightbox'), lightboxImg: $('lightbox-img'),
    };
    // ?noanim — без анимаций (для печати и скриншотов)
    const noAnim = new URLSearchParams(location.search).has('noanim');
    if (noAnim) document.documentElement.classList.add('no-anim');
    const reduceMotion = noAnim || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const PHOTO_TOP = ['slide--cover', 'slide--day', 'slide--final'];

    let current = -1;
    let galleryTimer = null;

    ui.total.textContent = slides.length;

    /* ── Переход между слайдами ─────────────────────────── */
    function resolve(target) {
        if (typeof target === 'number') return target;
        if (/^\d+$/.test(target)) return Number(target);
        return slides.findIndex((s) => s.id === target);
    }

    function go(target) {
        let i = resolve(target);
        if (i < 0 || Number.isNaN(i)) return;
        i = Math.max(0, Math.min(slides.length - 1, i));
        if (i === current) return;

        slides.forEach((s, k) => {
            s.classList.toggle('is-active', k === i);
            s.classList.toggle('is-before', k < i);
            s.setAttribute('aria-hidden', k === i ? 'false' : 'true');
            s.inert = k !== i;
        });
        current = i;
        const slide = slides[i];
        slide.scrollTop = 0;

        ui.cur.textContent = i + 1;
        ui.title.textContent = slide.dataset.title || '';
        ui.bar.style.width = ((i + 1) / slides.length * 100) + '%';
        ui.prev.disabled = i === 0;
        ui.next.disabled = i === slides.length - 1;
        document.body.dataset.tone = slide.classList.contains('theme-navy') ? 'dark' : 'light';
        document.body.dataset.bg = ['theme-navy', 'theme-beige', 'theme-cream'].find((c) => slide.classList.contains(c)) || '';
        document.body.dataset.photo = PHOTO_TOP.some((c) => slide.classList.contains(c)) ? 'top' : 'none';
        document.title = (slide.dataset.title ? slide.dataset.title + ' · ' : '') + "England's Historic Castles";
        history.replaceState(null, '', '#' + (i + 1));

        if (i > 0) ui.hint.classList.add('is-hidden');
        onEnter(slide);
    }
    const next = () => go(current + 1);
    const prev = () => go(current - 1);

    function onEnter(slide) {
        // Счётчики 0 → 7
        slide.querySelectorAll('[data-count]').forEach(countUp);
        // Линия маршрута рисуется заново
        const line = slide.querySelector('.map__line');
        if (line && !reduceMotion) {
            line.classList.remove('is-drawing');
            void line.getBoundingClientRect();
            line.classList.add('is-drawing');
        }
        // Автопрокрутка фото только на активном слайде
        clearInterval(galleryTimer);
        const gallery = slide.querySelector('[data-gallery]');
        if (gallery && gallery.querySelectorAll('.gallery__item').length > 1 && !reduceMotion) {
            galleryTimer = setInterval(() => {
                if (!gallery.matches(':hover')) showPhoto(gallery, 'next');
            }, 4500);
        }
    }

    function countUp(el) {
        const target = Number(el.dataset.count);
        if (reduceMotion) { el.textContent = target; return; }
        const start = performance.now() + 350;
        const dur = 900;
        el.textContent = '0';
        function tick(now) {
            const t = Math.min(1, Math.max(0, (now - start) / dur));
            el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)));
            if (t < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }

    /* ── Галерея ────────────────────────────────────────── */
    function showPhoto(gallery, which) {
        const items = Array.from(gallery.querySelectorAll('.gallery__item'));
        const thumbs = Array.from(gallery.querySelectorAll('.gallery__thumb'));
        let idx = items.findIndex((it) => it.classList.contains('is-active'));
        idx = which === 'next' ? (idx + 1) % items.length : Number(which);
        items.forEach((it, k) => it.classList.toggle('is-active', k === idx));
        thumbs.forEach((th, k) => th.classList.toggle('is-active', k === idx));
    }

    /* ── Обзор всех слайдов ─────────────────────────────── */
    slides.forEach((s, i) => {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'ov-card';
        btn.dataset.goto = String(i);
        if (s.dataset.thumb) btn.style.backgroundImage = 'url("' + s.dataset.thumb + '")';
        else if (!s.classList.contains('theme-navy')) btn.classList.add('is-cream');
        btn.innerHTML = '<span class="ov-card__num"></span><span class="ov-card__title"></span>';
        btn.querySelector('.ov-card__num').textContent = i + 1;
        btn.querySelector('.ov-card__title').textContent = s.dataset.title || '';
        li.appendChild(btn);
        ui.grid.appendChild(li);
    });

    function openOverview() {
        ui.grid.querySelectorAll('.ov-card').forEach((c, i) => c.classList.toggle('is-current', i === current));
        ui.overview.hidden = false;
        const cur = ui.grid.querySelector('.is-current');
        (cur || ui.grid.querySelector('button')).focus();
    }
    const closeOverview = () => { ui.overview.hidden = true; };

    function openLightbox(src, alt) {
        ui.lightboxImg.src = src;
        ui.lightboxImg.alt = alt || '';
        ui.lightbox.hidden = false;
        ui.lightbox.querySelector('button').focus();
    }
    const closeLightbox = () => { ui.lightbox.hidden = true; ui.lightboxImg.src = ''; };
    const modalOpen = () => !ui.overview.hidden || !ui.lightbox.hidden;

    function toggleFullscreen() {
        if (document.fullscreenElement) document.exitFullscreen();
        else if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(() => {});
    }

    /* ── Маршрут: подсветка и фильтр по регионам ────────── */
    const route = document.querySelector('.route');
    if (route) {
        const linked = Array.from(route.querySelectorAll('[data-slug]'));
        const highlight = (slug) => linked.forEach((el) => el.classList.toggle('is-hover', el.dataset.slug === slug));
        ['mouseover', 'focusin'].forEach((ev) => route.addEventListener(ev, (e) => {
            const el = e.target.closest('[data-slug]');
            highlight(el ? el.dataset.slug : null);
        }));
        route.addEventListener('mouseleave', () => highlight(null));

        route.querySelectorAll('.chip').forEach((chip) => chip.addEventListener('click', () => {
            const region = chip.dataset.region;
            route.querySelectorAll('.chip').forEach((c) => {
                const on = c === chip;
                c.classList.toggle('is-active', on);
                c.setAttribute('aria-pressed', on ? 'true' : 'false');
            });
            linked.forEach((el) => el.classList.toggle('is-dim', region !== 'all' && el.dataset.group !== region));
        }));

        const line = route.querySelector('.map__line');
        if (line && line.getTotalLength) line.style.setProperty('--len', Math.ceil(line.getTotalLength()));
    }

    /* ── Калькулятор стоимости ──────────────────────────── */
    const calc = document.querySelector('.calc');
    if (calc) {
        const price = Number(calc.dataset.price);
        const out = $('calc-n');
        const total = $('calc-total');
        const [minus, plus] = calc.querySelectorAll('[data-step]');
        let n = 1;
        const render = () => {
            out.textContent = n;
            total.textContent = '£' + (n * price).toLocaleString('en-GB');
            minus.disabled = n <= 1;
            plus.disabled = n >= 20;
        };
        calc.addEventListener('click', (e) => {
            const b = e.target.closest('[data-step]');
            if (!b) return;
            n = Math.max(1, Math.min(20, n + Number(b.dataset.step)));
            render();
        });
        render();
    }

    /* ── Клики ──────────────────────────────────────────── */
    document.addEventListener('click', (e) => {
        const t = e.target;
        if (t.closest('[data-close-lightbox]') || t === ui.lightbox || t === ui.lightboxImg) return closeLightbox();
        if (t.closest('[data-close-overview]') || t === ui.overview) return closeOverview();

        const show = t.closest('[data-show]');
        if (show) { showPhoto(show.closest('[data-gallery]'), show.dataset.show); return; }

        const lb = t.closest('[data-lightbox]');
        if (lb) { const img = lb.querySelector('img'); openLightbox(lb.dataset.lightbox, img && img.alt); return; }

        const goto = t.closest('[data-goto]');
        if (goto) { closeOverview(); go(goto.dataset.goto); return; }

        if (t.closest('[data-next]')) return next();
    });
    ui.prev.addEventListener('click', prev);
    ui.next.addEventListener('click', next);
    $('btn-overview').addEventListener('click', openOverview);
    $('btn-fs').addEventListener('click', toggleFullscreen);

    /* ── Клавиатура ─────────────────────────────────────── */
    document.addEventListener('keydown', (e) => {
        if (e.altKey || e.ctrlKey || e.metaKey) return;
        if (e.key === 'Escape') { closeLightbox(); closeOverview(); return; }
        if (modalOpen()) return;

        // Enter/пробел на строке таблицы или точке карты
        const goto = e.target.closest && e.target.closest('tr[data-goto], g[data-goto]');
        if (goto && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); go(goto.dataset.goto); return; }
        if (e.target.closest && e.target.closest('button, a, input, textarea, select') && (e.key === 'Enter' || e.key === ' ')) return;

        switch (e.key) {
            case 'ArrowRight': case 'PageDown': case ' ': e.preventDefault(); next(); break;
            case 'ArrowLeft': case 'PageUp': e.preventDefault(); prev(); break;
            case 'Home': e.preventDefault(); go(0); break;
            case 'End': e.preventDefault(); go(slides.length - 1); break;
            case 'o': case 'O': case 'щ': case 'Щ': openOverview(); break;
            case 'f': case 'F': case 'а': case 'А': toggleFullscreen(); break;
        }
    });

    /* ── Колесо мыши (если слайд не прокручивается) ─────── */
    let lastWheel = 0;
    deck.addEventListener('wheel', (e) => {
        if (modalOpen() || Math.abs(e.deltaY) < 12 || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
        const s = slides[current];
        const scrollable = s.scrollHeight > s.clientHeight + 2;
        if (scrollable) {
            const atTop = s.scrollTop <= 0;
            const atBottom = s.scrollTop + s.clientHeight >= s.scrollHeight - 2;
            if ((e.deltaY > 0 && !atBottom) || (e.deltaY < 0 && !atTop)) return;
        }
        const now = Date.now();
        if (now - lastWheel < 1000) return;
        lastWheel = now;
        if (e.deltaY > 0) next(); else prev();
    }, { passive: true });

    /* ── Свайпы на телефоне ─────────────────────────────── */
    let touch = null;
    deck.addEventListener('touchstart', (e) => {
        const p = e.changedTouches[0];
        touch = { x: p.clientX, y: p.clientY };
    }, { passive: true });
    deck.addEventListener('touchend', (e) => {
        if (!touch) return;
        const p = e.changedTouches[0];
        const dx = p.clientX - touch.x;
        const dy = p.clientY - touch.y;
        touch = null;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) { if (dx < 0) next(); else prev(); }
    }, { passive: true });

    /* ── Старт: слайд из адреса (#5) или первый ─────────── */
    window.addEventListener('hashchange', () => go(Number(location.hash.slice(1)) - 1));
    const fromHash = Number(location.hash.slice(1));
    go(fromHash >= 1 ? fromHash - 1 : 0);
})();
