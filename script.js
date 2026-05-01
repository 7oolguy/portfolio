document.addEventListener('DOMContentLoaded', () => {
    // 0. Preloader Terminal Logic
    const loader = document.getElementById('loader');
    const terminalLines = document.getElementById('terminal-lines');
    const asciiContainer = document.getElementById('ascii-container');
    
    const bootLines = [
        "> INITIALIZING KERNEL...",
        "> LOADING SYSTEMS MODULES... <span class='success'>DONE</span>",
        "> CHECKING SECURITY PROTOCOLS... <span class='success'>SAFE</span>",
        "> ESTABLISHING MULTI-TENANT HANDSHAKE... <span class='success'>READY</span>",
        "> MOUNTING DATA ARCHITECTURE... <span class='success'>SUCCESS</span>",
        "> SYNCING REPOS... <span class='success'>COMPLETE</span>",
        "> LAUNCHING <span class='command'>YAN_OS_v1.0.4</span>..."
    ];

    let lineIndex = 0;
    const typeLine = () => {
        if (lineIndex < bootLines.length) {
            const line = document.createElement('div');
            line.className = 'terminal-line';
            line.innerHTML = bootLines[lineIndex];
            terminalLines.appendChild(line);
            lineIndex++;
            setTimeout(typeLine, Math.random() * 200 + 100);
        } else {
            // Show ASCII
            setTimeout(() => {
                terminalLines.style.display = 'none';
                asciiContainer.style.display = 'block';
                
                // Final Exit
                setTimeout(() => {
                    loader.style.opacity = '0';
                    loader.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                    setTimeout(() => {
                        loader.style.display = 'none';
                        lenis.start(); // Start scroll only after boot
                    }, 800);
                }, 1500);
            }, 500);
        }
    };

    // Initialize Lenis but keep it stopped
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    })

    lenis.stop(); // Stop scroll initially
    typeLine(); // Start boot sequence

    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // 1. Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme or default to light
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    });

    // 2. Language Toggle Logic
    const langToggle = document.getElementById('lang-toggle');
    const translations = {
        en: {
            'nav-about': 'About',
            'nav-projects': 'Projects',
            'nav-contact': 'Contact',
            'hero-title': 'I build robust<br><span class="accent">systems.</span>',
            'hero-subtitle': 'Focused on performance, scalability, and the architecture of modern software.',
            'btn-view-work': 'View Work',
            'btn-contact-me': 'Contact Me',
            'section-about': 'About',
            'about-description': 'I am a Systems Programmer with a strong focus on Data Architecture and Analysis. With 2+ years of professional experience and a background of 3.5 years living in the USA, I offer fluent English and a global perspective on designing robust financial infrastructures and complex data intelligence solutions.',
            'stat-uptime': 'Years Uptime',
            'stat-reports': 'BI Reports',
            'tag-arch': 'Data Architecture',
            'tag-analysis': 'Data Analysis',
            'section-projects': 'Selected Projects',
            'p1-title': 'Church Treasury Engine',
            'p1-subtitle': 'Laravel / Architecture / AWS / Automation',
            'p2-title': 'Payroll Tracking & Integration',
            'p2-subtitle': 'Laravel / Database Automation / Tracking',
            'p3-title': 'Enterprise BI & Data Architecture',
            'p3-subtitle': 'Architecture / SQL Server / Databricks / Python',
            'contact-title': "Let's collaborate.",
            'contact-subtitle': "I'm currently focused on enterprise architecture and data engineering. Available for freelance opportunities worldwide.",
            'status-available': 'Available for Freelance / Full-remote',
            'greeting-morning': 'INIT: GOOD_MORNING',
            'greeting-afternoon': 'INIT: GOOD_AFTERNOON',
            'greeting-evening': 'INIT: GOOD_EVENING'
        },
        pt: {
            'nav-about': 'Sobre',
            'nav-projects': 'Projetos',
            'nav-contact': 'Contato',
            'hero-title': 'Eu construo<br><span class="accent">sistemas robustos.</span>',
            'hero-subtitle': 'Focado em performance, escalabilidade e arquitetura de software moderno.',
            'btn-view-work': 'Ver Projetos',
            'btn-contact-me': 'Contato',
            'section-about': 'Sobre',
            'about-description': 'Sou Programador de Sistemas com foco em Arquitetura e Análise de Dados. Com mais de 2 anos de experiência profissional e uma bagagem de 3 anos e meio vivendo nos EUA, possuo inglês fluente e uma visão global para o design de infraestruturas financeiras e soluções de inteligência de dados.',
            'stat-uptime': 'Anos de Uptime',
            'stat-reports': 'Relatórios BI',
            'tag-arch': 'Arquitetura de Dados',
            'tag-analysis': 'Análise de Dados',
            'section-projects': 'Projetos Selecionados',
            'p1-title': 'Gerenciador de Tesouraria',
            'p1-subtitle': 'Laravel / Arquitetura / AWS / Automação',
            'p2-title': 'Rastreamento de Folha & Integração',
            'p2-subtitle': 'Laravel / Automação de Dados / Financeiro',
            'p3-title': 'BI Enterprise & Arquitetura',
            'p3-subtitle': 'Arquitetura / SQL Server / Databricks / Python',
            'contact-title': "Vamos colaborar.",
            'contact-subtitle': "Atualmente focado em arquitetura enterprise e engenharia de dados. Disponível para projetos Freelance / PJ.",
            'status-available': 'Disponível para Projetos Freelance / PJ',
            'greeting-morning': 'INIT: BOM_DIA',
            'greeting-afternoon': 'INIT: BOA_TARDE',
            'greeting-evening': 'INIT: BOA_NOITE'
        }
    };

    let currentLang = localStorage.getItem('lang') || 'en';

    const updateLanguage = () => {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[currentLang][key]) {
                el.innerHTML = translations[currentLang][key];
            }
        });
        langToggle.textContent = currentLang.toUpperCase();
        updateGreeting();
    };

    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'pt' : 'en';
        localStorage.setItem('lang', currentLang);
        updateLanguage();
    });

    // 3. Dynamic Greeting
    const greetingElement = document.getElementById('greeting');
    const updateGreeting = () => {
        const hours = new Date().getHours();
        let key = 'greeting-evening';
        if (hours < 12) key = 'greeting-morning';
        else if (hours < 18) key = 'greeting-afternoon';
        greetingElement.textContent = translations[currentLang][key];
    };

    // 4. Faster Typing Effect
    const subtitle = document.querySelector('.hero p');
    const typeWriter = () => {
        const text = translations[currentLang]['hero-subtitle'];
        subtitle.textContent = '';
        let i = 0;
        const typing = () => {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typing, 20);
            }
        };
        typing();
    };

    updateLanguage();
    setTimeout(typeWriter, 500);

    // 5. Copy Email Functionality
    const copyBtn = document.getElementById('copy-email');
    const emailLink = document.getElementById('email-link');

    copyBtn.addEventListener('click', () => {
        const email = emailLink.textContent;
        navigator.clipboard.writeText(email).then(() => {
            copyBtn.classList.add('copied');
            setTimeout(() => copyBtn.classList.remove('copied'), 2000);
        });
    });

    // 3. Refined Custom Cursor with Trailing Effect
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice) {
        let cursorX = 0;
        let cursorY = 0;
        let outlineX = 0;
        let outlineY = 0;

        window.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
            
            // Immediate position for dot
            cursorDot.style.left = cursorX + 'px';
            cursorDot.style.top = cursorY + 'px';
            cursorDot.style.transform = 'translate(-50%, -50%)';
        });

        // Animate outline with trailing (lerp)
        const animateCursor = () => {
            const lerp = (start, end, amt) => (1 - amt) * start + amt * end;
            
            outlineX = lerp(outlineX, cursorX, 0.15);
            outlineY = lerp(outlineY, cursorY, 0.15);
            
            cursorOutline.style.left = outlineX + 'px';
            cursorOutline.style.top = outlineY + 'px';
            cursorOutline.style.transform = 'translate(-50%, -50%)';
            
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Cursor hover effects
        const interactiveElements = document.querySelectorAll('a, button, .project-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                if(body.classList.contains('dark-mode')) {
                    cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.backgroundColor = 'transparent';
            });
        });
    } else {
        // Remove cursor elements on touch devices
        if (cursorDot) cursorDot.remove();
        if (cursorOutline) cursorOutline.remove();
    }

    // 5. Reveal Sections on Scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // Reveal only once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-section').forEach(section => {
        revealObserver.observe(section);
    });

    // 6. Smooth Parallax-like effect for Hero & Hide Scroll Indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
            heroContent.style.opacity = 1 - (scrolled / 700);
        }

        if (scrollIndicator) {
            scrollIndicator.style.opacity = 0.6 - (scrolled / 300);
            if (scrolled > 300) {
                scrollIndicator.style.pointerEvents = 'none';
            }
        }
    });

    // 7. Project Card Modal Logic
    const projectsData = {
        en: [
            {
                title: "Church Treasury Engine",
                tags: ["Laravel", "Multi-tenancy", "AWS", "Automation", "Security"],
                image: "assets/treasury.png",
                description: "A personally conceived and engineered solution originally created to automate treasury workflows. This system has grown into a mission-critical platform adopted by the União Central Brasileira, currently serving 6 associations. Built with a robust multi-tenant architecture, the system features sophisticated data scoping and enterprise-grade security protocols. It manages comprehensive bank balances and financial advances, generating standardized electronic files for automated inter-account transfers and payments."
            },
            {
                title: "Payroll Tracking & Integration",
                tags: ["Laravel", "Database Automation", "Financial Tracking"],
                image: "assets/payroll.png",
                description: "Developed a streamlined system for the Associação Adventista for the precise tracking of staff expenses and automated database synchronization. This tool simplifies complex financial tracking, ensuring all payroll-related data is accurately captured and efficiently uploaded to the core database, reducing manual entry errors and improving auditability."
            },
            {
                title: "Enterprise BI & Data Architecture",
                tags: ["SQL Server", "Databricks", "Python", "Systems Engineering"],
                image: "assets/bi.png",
                description: "Responsible for the end-to-end data architecture and performance engineering for the entire Associação Adventista de Educação e Ass. Social. I've designed high-performance database schemas that power internal systems and built an intelligence layer with over 50 automated reports. Utilizing SQL Server and Databricks, I ensure system scalability and provide the data foundation for all organizational applications."
            }
        ],
        pt: [
            {
                title: "Gerenciador de Tesouraria",
                tags: ["Laravel", "Multi-tenancy", "AWS", "Automação", "Segurança"],
                image: "assets/treasury.png",
                description: "Uma solução concebida pessoalmente para automatizar fluxos de tesouraria. O sistema tornou-se uma plataforma crítica adotada pela União Central Brasileira, servindo 6 associações. Construído com arquitetura multi-tenant, apresenta escopo de dados sofisticado e protocolos de segurança enterprise. Gerencia saldos bancários e adiantamentos, gerando arquivos eletrônicos para transferências bancárias automáticas."
            },
            {
                title: "Rastreamento de Folha & Integração",
                tags: ["Laravel", "Automação de Dados", "Financeiro"],
                image: "assets/payroll.png",
                description: "Desenvolvi um sistema simplificado para a Associação Adventista para o rastreio preciso de despesas de funcionários e sincronização automática de banco de dados. Esta ferramenta simplifica o acompanhamento financeiro complexo, garantindo que todos os dados de folha sejam capturados e enviados ao banco de dados central, reduzindo erros manuais."
            },
            {
                title: "BI Enterprise & Arquitetura",
                tags: ["SQL Server", "Databricks", "Python", "Engenharia de Sistemas"],
                image: "assets/bi.png",
                description: "Responsável pela arquitetura de dados e engenharia de performance para toda a Associação Adventista de Educação e Ass. Social. Desenvolvi esquemas de banco de dados de alta performance e uma camada de inteligência com mais de 50 relatórios automáticos. Utilizando SQL Server e Databricks, garanto a escalabilidade e a base de dados para todas as aplicações."
            }
        ]
    };

    const modal = document.getElementById('project-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalTags = document.getElementById('modal-tags');
    const modalDesc = document.getElementById('modal-description');
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            const data = projectsData[currentLang][index];
            modalTitle.textContent = data.title;
            modalImage.style.backgroundImage = `url(${data.image})`;
            modalDesc.textContent = data.description;
            
            // Clear and add tags
            modalTags.innerHTML = '';
            data.tags.forEach(tag => {
                const span = document.createElement('span');
                span.className = 'tech-tag';
                span.textContent = tag;
                modalTags.appendChild(span);
            });

            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('active'), 10);
            body.style.overflow = 'hidden';
            lenis.stop(); // Stop scrolling
        });
    });

    const closeModal = () => {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            body.style.overflow = '';
        }, 300);
        lenis.start(); // Start scrolling
    };

    modalClose.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // 6. Project Card Hover Scale (Simplified)
    // Handled in CSS for smoother performance
});
