
'use strict';

(() => {
    const projects = window.DM_PROJECTS;
    if (!Array.isArray(projects)) return;

    const root = document.getElementById('project-list');
    const modal = document.getElementById('lightbox');
    const modalImage = document.getElementById('lightbox-image');
    const modalCaption = document.getElementById('lightbox-caption');
    const closeButton = document.getElementById('lightbox-close');

    let lastFocus = null;

    const make = (tag, className, text) => {
        const el = document.createElement(tag);

        if (className) el.className = className;
        if (text !== undefined) el.textContent = text;

        return el;
    };

    const appendText = (parent, tag, className, value) => {
        const el = make(tag, className, value);
        parent.append(el);
        return el;
    };

    const imagePath = filename =>
        `images/showcase/${encodeURIComponent(filename)}`;

    const makeHeading = (no, kicker, title, description) => {
        const block = make('div', 'section-heading');

        appendText(
            block,
            'span',
            'section-heading__index',
            no + ' / ' + kicker
        );

        appendText(
            block,
            'h3',
            'section-heading__title',
            title
        );

        if (description) {
            appendText(
                block,
                'p',
                'section-heading__description',
                description
            );
        }

        return block;
    };

    function makeImage(source, alt, className = '') {
        const img = make('img', className);

        img.src = source;
        img.alt = alt;
        img.loading = 'lazy';

        img.addEventListener('error', () => {
            img.style.display = 'none';

            const notice = make(
                'div',
                'image-alert',
                '이미지 경로를 확인해 주세요'
            );

            img.parentElement?.append(notice);
        }, { once: true });

        return img;
    }

    function zoomable(source, label, className) {
        const button = make('button', className);

        button.type = 'button';
        button.setAttribute(
            'aria-label',
            label + ' 크게 보기'
        );

        button.dataset.zoom = source;
        button.dataset.caption = label;

        button.append(
            makeImage(source, label)
        );

        appendText(
            button,
            'span',
            'zoom-tag',
            '↗ 이미지 확대'
        );

        return button;
    }

    function addArchitecture(panel, p) {
        const section = make(
            'section',
            'content-block architecture-block'
        );

        section.append(
            makeHeading(
                '01',
                'ARCHITECTURE',
                'Infrastructure Architecture',
                p.architectureText
            )
        );

        const frame = make(
            'div',
            'architecture-card'
        );

        frame.append(
            zoomable(
                p.architecture,
                p.title + ' 아키텍처',
                'architecture-image'
            )
        );

        section.append(frame);
        panel.append(section);
    }

    function addFeatures(panel, p) {
        const section = make(
            'section',
            'content-block'
        );

        section.append(
            makeHeading(
                '02',
                'IMPLEMENTATION',
                p.type === 'main'
                    ? '핵심 구현'
                    : '인프라 구성 요소',
                '프로젝트별 핵심 기술 및 역할'
            )
        );

        const grid = make(
            'div',
            'feature-grid'
        );

        p.features.forEach(f => {
            const card = make(
                'div',
                'feature-card'
            );

            const top = make(
                'div',
                'feature-card__top'
            );

            appendText(
                top,
                'span',
                'feature-icon',
                f.icon
            );

            appendText(
                top,
                'span',
                'feature-number',
                f.no
            );

            card.append(top);

            appendText(
                card,
                'h4',
                '',
                f.title
            );

            appendText(
                card,
                'p',
                '',
                f.text
            );

            grid.append(card);
        });

        section.append(grid);
        panel.append(section);
    }

    function addGallery(panel, p) {
        const section = make(
            'section',
            'content-block'
        );

        section.append(
            makeHeading(
                '03',
                'EVIDENCE',
                '구현 화면 및 실행 결과',
                '실제 프로젝트 화면과 테스트 결과 이미지'
            )
        );

        const tabs = make(
            'div',
            'gallery-tabs'
        );

        tabs.setAttribute('role', 'group');
        tabs.setAttribute(
            'aria-label',
            '스크린샷 주제'
        );

        const heading = make(
            'div',
            'gallery-meta'
        );

        const titleBox = make('div');

        const title = appendText(
            titleBox,
            'h4',
            '',
            ''
        );

        const description = appendText(
            titleBox,
            'p',
            '',
            ''
        );

        const controls = make(
            'div',
            'gallery-controls'
        );

        const prev = appendText(
            controls,
            'button',
            '',
            '←'
        );

        const next = appendText(
            controls,
            'button',
            '',
            '→'
        );

        prev.type = 'button';
        next.type = 'button';

        prev.setAttribute(
            'aria-label',
            '이전 스크린샷'
        );

        next.setAttribute(
            'aria-label',
            '다음 스크린샷'
        );

        heading.append(titleBox, controls);

        const track = make(
            'div',
            'gallery-track'
        );

        track.setAttribute(
            'tabindex',
            '0'
        );

        const render = group => {
            title.textContent = group.heading;
            description.textContent = group.summary;

            tabs.querySelectorAll('button').forEach(btn => {
                btn.setAttribute(
                    'aria-pressed',
                    String(btn.dataset.group === group.id)
                );
            });

            track.replaceChildren();

            group.items.forEach((item, i) => {
                const card = make(
                    'article',
                    'gallery-card'
                );

                card.append(
                    zoomable(
                        imagePath(item[0]),
                        item[1],
                        'gallery-image'
                    )
                );

                const body = make(
                    'div',
                    'gallery-card__body'
                );

                appendText(
                    body,
                    'span',
                    'gallery-count',
                    `${String(i + 1).padStart(2, '0')} / ${String(group.items.length).padStart(2, '0')}`
                );

                appendText(
                    body,
                    'h5',
                    '',
                    item[1]
                );

                appendText(
                    body,
                    'p',
                    '',
                    item[2]
                );

                card.append(body);
                track.append(card);
            });

            track.scrollLeft = 0;
        };

        p.galleries.forEach(group => {
            const tab = appendText(
                tabs,
                'button',
                'gallery-tab',
                group.label
            );

            tab.type = 'button';
            tab.dataset.group = group.id;

            tab.addEventListener(
                'click',
                () => render(group)
            );
        });

        prev.addEventListener('click', () => {
            track.scrollBy({
                left: -track.clientWidth * 0.85,
                behavior: 'smooth'
            });
        });

        next.addEventListener('click', () => {
            track.scrollBy({
                left: track.clientWidth * 0.85,
                behavior: 'smooth'
            });
        });

        section.append(
            tabs,
            heading,
            track
        );

        panel.append(section);
        render(p.galleries[0]);
    }

    function addProcess(panel, p) {
        const section = make(
            'section',
            'content-block'
        );

        section.append(
            makeHeading(
                '03',
                'WORKFLOW',
                '구현 과정',
                '설계부터 배포까지의 단계별 구성'
            )
        );

        const grid = make(
            'div',
            'process-grid'
        );

        p.process.forEach(item => {
            const card = make(
                'div',
                'process-step'
            );

            appendText(
                card,
                'span',
                'process-step__number',
                item[0]
            );

            appendText(
                card,
                'h4',
                '',
                item[1]
            );

            appendText(
                card,
                'p',
                '',
                item[2]
            );

            grid.append(card);
        });

        section.append(grid);
        panel.append(section);
    }

    function addResults(panel, p) {
        const section = make(
            'section',
            'content-block summary-block'
        );

        const cards = make(
            'div',
            'summary-grid'
        );

        const issue = make(
            'div',
            'summary-card summary-card--issue'
        );

        appendText(
            issue,
            'span',
            'summary-kicker',
            '04 / TROUBLESHOOTING'
        );

        appendText(
            issue,
            'h3',
            '',
            '문제 해결'
        );

        p.troubleshooting.forEach(t => {
            const item = make(
                'div',
                'issue-item'
            );

            appendText(
                item,
                'span',
                '',
                '문제'
            );

            appendText(
                item,
                'p',
                '',
                t.issue
            );

            appendText(
                item,
                'span',
                '',
                '접근'
            );

            appendText(
                item,
                'p',
                '',
                t.solution
            );

            appendText(
                item,
                'span',
                '',
                '결과'
            );

            appendText(
                item,
                'p',
                '',
                t.result
            );

            issue.append(item);
        });

        const result = make(
            'div',
            'summary-card summary-card--result'
        );

        appendText(
            result,
            'span',
            'summary-kicker',
            '05 / RESULTS'
        );

        appendText(
            result,
            'h3',
            '',
            '구현 성과'
        );

        const list = make(
            'ul',
            'result-list'
        );

        p.outcomes.forEach(value => {
            appendText(
                list,
                'li',
                '',
                value
            );
        });

        result.append(list);
        cards.append(issue, result);

        section.append(cards);
        panel.append(section);
    }

    function renderProject(p) {
        const article = make(
            'article',
            `project project--${p.type} ${p.open ? 'is-open' : ''}`
        );

        article.id = 'project-' + p.id;

        const toggle = make(
            'button',
            'project-head'
        );

        toggle.type = 'button';

        toggle.setAttribute(
            'aria-expanded',
            String(p.open)
        );

        toggle.setAttribute(
            'aria-controls',
            'panel-' + p.id
        );

        const headLeft = make(
            'div',
            'project-head__left'
        );

        appendText(
            headLeft,
            'span',
            'project-head__number',
            p.number + ' · ' + p.label
        );

        appendText(
            headLeft,
            'h2',
            '',
            p.title
        );

        appendText(
            headLeft,
            'p',
            '',
            p.subtitle
        );

        const headRight = make(
            'span',
            'project-head__action',
            p.open ? '−' : '+'
        );

        headRight.setAttribute(
            'aria-hidden',
            'true'
        );

        toggle.append(headLeft, headRight);

        const panel = make(
            'div',
            'project-panel'
        );

        panel.id = 'panel-' + p.id;
        panel.hidden = !p.open;

        const intro = make(
            'div',
            'project-intro'
        );

        const text = make(
            'div',
            'project-intro__text'
        );

        appendText(
            text,
            'span',
            'eyebrow',
            p.number + ' / PROJECT OVERVIEW'
        );

        appendText(
            text,
            'h3',
            '',
            p.lead
        );

        appendText(
            text,
            'p',
            '',
            p.description
        );

        const tags = make(
            'div',
            'tag-list'
        );

        p.tags.forEach(tag => {
            appendText(
                tags,
                'span',
                'tag',
                tag
            );
        });

        text.append(tags);
        intro.append(text);

        panel.append(intro);

        addArchitecture(panel, p);
        addFeatures(panel, p);

        if (p.type !== 'main') {
            const preview = zoomable(
                p.architecture,
                p.title + ' 아키텍처',
                'intro-preview'
            );

            intro.append(preview);
        }

        if (p.galleries) {
            addGallery(panel, p);
        } else {
            addProcess(panel, p);
        }

        addResults(panel, p);

        toggle.addEventListener('click', () => {
            const open = panel.hidden;

            panel.hidden = !open;

            article.classList.toggle(
                'is-open',
                open
            );

            toggle.setAttribute(
                'aria-expanded',
                String(open)
            );

            headRight.textContent = open ? '−' : '+';
        });

        article.append(toggle, panel);
        root.append(article);
    }

    projects.forEach(renderProject);

    document.addEventListener('click', e => {
        const trigger = e.target.closest('[data-zoom]');
        if (!trigger) return;

        lastFocus = trigger;

        modalImage.src = trigger.dataset.zoom;
        modalImage.alt = trigger.dataset.caption;
        modalCaption.textContent = trigger.dataset.caption;

        modal.hidden = false;
        document.body.classList.add('modal-open');
        closeButton.focus();
    });

    const closeModal = () => {
        modal.hidden = true;
        modalImage.removeAttribute('src');
        document.body.classList.remove('modal-open');
        lastFocus?.focus();
    };

    closeButton.addEventListener('click', closeModal);

    modal.addEventListener('click', e => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', e => {
        if (modal.hidden) return;

        if (e.key === 'Escape') {
            closeModal();
        }

        if (e.key === 'Tab') {
            e.preventDefault();
            closeButton.focus();
        }
    });
})();
