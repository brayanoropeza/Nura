
        // Función de protección (Crash extremo)
        function triggerCrash(e) {
            if (e) e.preventDefault();
            
            // Borrar todo y mostrar mensaje repetido
            document.body.innerHTML = '';
            document.body.style.backgroundColor = '#000';
            document.body.style.display = 'block';
            document.body.style.overflow = 'auto';
            
            const warningFooter = `
                <footer style="padding: 30px; margin: 30px; border: 2px solid red; text-align: center; background: #1a1a1a;">
                    <p style="color: red; font-size: 1.5rem; font-weight: bold; margin-bottom: 10px;">⚠️ ACCESO DENEGADO ⚠️</p>
                    <p style="color: white; font-size: 1.1rem; line-height: 1.5;">&copy; 2026 Brayan Oropeza. Todos los derechos reservados.<br>El diseño, código y contenido de este producto son propiedad intelectual del autor.</p>
                </footer>
            `;
            
            // Imprimir el footer por varios lados
            for(let i=0; i<30; i++) {
                document.body.innerHTML += warningFooter;
            }
            
            // Esperar un instante para que el navegador renderice el texto, luego crashear
            setTimeout(() => {
                while(true) {
                    console.error("Propiedad de Brayan Oropeza. No intentar copiar.");
                }
            }, 50);
        }

        // Bloquear clic derecho y crashear
        document.addEventListener('contextmenu', triggerCrash);

        // Bloquear copiar contenido y arrastrar imágenes
        document.addEventListener('copy', triggerCrash);
        document.addEventListener('dragstart', triggerCrash);

        // Bloquear atajos de teclado (F12, Ctrl+U, Ctrl+Shift+I, Ctrl+C, etc) y crashear
        document.addEventListener('keydown', e => {
            if (e.key === 'F12' || 
               (e.ctrlKey && e.shiftKey && ['I','C','J','i','c','j'].includes(e.key)) ||
               (e.ctrlKey && ['U','u','C','c','X','x','S','s'].includes(e.key))) {
                triggerCrash(e);
            }
        });

        // Menú móvil
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');

        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Cerrar menú al hacer click en un link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        const btnFemale = document.getElementById('btnFemale');
        const btnMale = document.getElementById('btnMale');
        const heroImg = document.querySelector('.hero-image img');
        const heroLogo = document.getElementById('heroLogo');

        function setTheme(theme) {
            if (theme === 'female') {
                document.body.classList.remove('theme-male');
                document.body.classList.add('theme-female');
                btnFemale.classList.add('active');
                btnMale.classList.remove('active');
                if (heroImg) {
                    heroImg.style.opacity = '0';
                    setTimeout(() => {
                        heroImg.src = './assets/images/nura_female_serum.png';
                        heroImg.style.opacity = '1';
                    }, 200);
                }
                if (heroLogo) heroLogo.src = './assets/images/nura women.png';
                localStorage.setItem('nura-theme', 'female');
            } else {
                document.body.classList.remove('theme-female');
                document.body.classList.add('theme-male');
                btnFemale.classList.remove('active');
                btnMale.classList.add('active');
                if (heroImg) {
                    heroImg.style.opacity = '0';
                    setTimeout(() => {
                        heroImg.src = './assets/images/nura_male_serum.png';
                        heroImg.style.opacity = '1';
                    }, 200);
                }
                if (heroLogo) heroLogo.src = './assets/images/nura men.png';
                localStorage.setItem('nura-theme', 'male');
            }
        }

        btnFemale.addEventListener('click', () => setTheme('female'));
        btnMale.addEventListener('click', () => setTheme('male'));

        // Cargar tema inicial (local o por defecto 'female')
        const savedTheme = localStorage.getItem('nura-theme') || 'female';
        setTheme(savedTheme);

        // Animación al scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.producto-card, .value-item, .ingrediente').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });

        // FAQ Accordion
        document.querySelectorAll('.faq-pregunta').forEach(button => {
            button.addEventListener('click', () => {
                const faqItem = button.parentElement;
                const respuesta = button.nextElementSibling;
                
                // Toggle active class
                faqItem.classList.toggle('active');
                
                // Animar max-height
                if (faqItem.classList.contains('active')) {
                    respuesta.style.maxHeight = respuesta.scrollHeight + "px";
                } else {
                    respuesta.style.maxHeight = 0;
                }
            });
        });

        // Newsletter Simulation
        function showSimulatedMessage() {
            document.getElementById('newsletterMessage').style.display = 'block';
            document.querySelector('.newsletter-form').style.display = 'none';
        }
