document.addEventListener('DOMContentLoaded', () => {
    // --- Variáveis de Estado ---
    let currentLang = localStorage.getItem('language') || 'pt-br';
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const menuBtn = document.querySelector('.menu-btn');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav a');
    const header = document.querySelector('header');
    const langBtns = document.querySelectorAll('.lang-btn');

    // --- Efeito de Rolagem do Cabeçalho ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Gerenciamento de Tema (Modo Escuro/Claro) ---
    function setTheme(isDark) {
        if (isDark) {
            body.classList.add('dark-mode');
            if (themeToggle) themeToggle.checked = true;
            localStorage.setItem('darkMode', 'enabled');
        } else {
            body.classList.remove('dark-mode');
            if (themeToggle) themeToggle.checked = false;
            localStorage.setItem('darkMode', 'disabled');
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('change', () => setTheme(themeToggle.checked));
    }
    const savedTheme = localStorage.getItem('darkMode');
    setTheme(savedTheme === 'enabled');

    // --- Menu Mobile ---
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.replace('bx-menu', 'bx-x');
            } else {
                icon.classList.replace('bx-x', 'bx-menu');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            if (menuBtn) {
                menuBtn.querySelector('i').classList.replace('bx-x', 'bx-menu');
            }
        });
    });

    // --- Efeito de Digitação ---
    const typingSpan = document.getElementById('typing');
    const professions_pt = ["Resultados", "Experiência do Usuário", "Otimização de Sistemas", "Inovação Tecnológica"];
    const professions_en = ["Results", "User Experience", "Systems Optimization", "Technological Innovation"];
    let typingProfessions = [];
    let professionIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingTimeout;

    function type() {
        if (!typingSpan || typingProfessions.length === 0) return;

        const currentWord = typingProfessions[professionIndex];

        if (isDeleting) {
            typingSpan.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingSpan.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pausa no final da palavra
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            professionIndex = (professionIndex + 1) % typingProfessions.length;
            typeSpeed = 500; // Pausa antes da próxima palavra
        }

        typingTimeout = setTimeout(type, typeSpeed);
    }

    // --- Traduções ---
    // Em um cenário real, isso poderia ser carregado de um arquivo JSON.
    // Para esta versão, vamos contar principalmente com a estrutura HTML e apenas atualizar o efeito de digitação para o idioma, 
    // e deixar o HTML ter o texto PT padrão. Incluímos a estrutura básica de i18n para manter a funcionalidade.

    const i18nData = {
        "pt-br": {
            "nav_home": "Início", "nav_areas": "Habilidades", "nav_exp": "Experiência", "nav_edu": "Formação", "nav_contact": "Contato",
            "home_hello": "Olá, eu sou", "home_role": "Analista de Implantação e Otimização de Sistemas",
            "typing_label": "Foco em ", "btn_cv": "Download CV", "btn_contact": "Contate-me",
            "sec_areas": "Habilidades e", "sec_areas_span": "Competências",
            "sec_exp": "Experiência", "sec_exp_span": "Profissional",
            "sec_edu": "Formação &", "sec_edu_span": "Certificações",
            "footer_rights": "© 2025 Bruno Vinicius Cardoso Neves. Todos os direitos reservados."
        },
        "en": {
            "nav_home": "Home", "nav_areas": "Skills", "nav_exp": "Experience", "nav_edu": "Education", "nav_contact": "Contact",
            "home_hello": "Hello, I am", "home_role": "Implementation and Systems Optimization Analyst",
            "typing_label": "Focus on ", "btn_cv": "Download CV", "btn_contact": "Contact Me",
            "sec_areas": "Skills &", "sec_areas_span": "Competencies",
            "sec_exp": "Professional", "sec_exp_span": "Experience",
            "sec_edu": "Education &", "sec_edu_span": "Certifications",
            "footer_rights": "© 2025 Bruno Vinicius Cardoso Neves. All rights reserved."
        }
    };

    function applyLanguage(lang) {
        document.documentElement.lang = lang.startsWith('en') ? 'en' : 'pt-BR';
        const t = i18nData[lang];

        if (t) {
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (t[key]) el.innerHTML = t[key];
            });
        }

        typingProfessions = (lang === 'en') ? professions_en : professions_pt;
        professionIndex = 0; charIndex = 0; isDeleting = false;
        if (typingSpan) typingSpan.textContent = '';
        clearTimeout(typingTimeout);
        type();

        langBtns.forEach(b => b.classList.remove('active-lang'));
        const activeBtn = document.getElementById(lang);
        if (activeBtn) activeBtn.classList.add('active-lang');
        localStorage.setItem('language', lang);
    }

    langBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            applyLanguage(this.id);
        });
    });

    applyLanguage(currentLang);

    // --- Inicialização do Swiper (Carrossel) ---
    try {
        const swiper = new Swiper('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            grabCursor: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            }
        });
    } catch (e) { console.log('Swiper error', e); }

    // --- Animações de Rolagem (Scroll Reveal) ---
    const revealElements = document.querySelectorAll('.glass, .service-box, .timeline-content, .home-content, .home-img');

    // Estado inicial
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
    });

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 50) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Acionar ao carregar a página
});
