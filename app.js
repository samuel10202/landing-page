document.addEventListener('DOMContentLoaded', () => {

    // Menú móvil
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('open'));
    });

    // Modo oscuro con persistencia
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });

    // Botón principal del hero
    document.getElementById('btnPrincipal').addEventListener('click', () => {
        document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
    });

    // Animación al hacer scroll (reveal)
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.15 });
    reveals.forEach(el => observer.observe(el));

    // Botón de subir al inicio
    const scrollTopBtn = document.getElementById('scrollTop');
    window.addEventListener('scroll', () => {
        scrollTopBtn.classList.toggle('show', window.scrollY > 400);
    });
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Carrusel simple de testimonios
    const testimonials = [
        { text: '"Un equipo increíble, entregaron justo lo que necesitábamos."', author: '— Cliente satisfecho' },
        { text: '"Rápidos, profesionales y muy atentos a los detalles."', author: '— Laura M.' },
        { text: '"La mejor experiencia trabajando con un equipo técnico."', author: '— Carlos R.' }
    ];
    let current = 0;
    const textEl = document.getElementById('testimonialText');
    const authorEl = document.getElementById('testimonialAuthor');
    const dotsContainer = document.getElementById('testimonialDots');

    testimonials.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showTestimonial(i));
        dotsContainer.appendChild(dot);
    });

    function showTestimonial(index) {
        current = index;
        textEl.textContent = testimonials[current].text;
        authorEl.textContent = testimonials[current].author;
        document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === current));
    }

    setInterval(() => {
        current = (current + 1) % testimonials.length;
        showTestimonial(current);
    }, 5000);

    // Validación simple del formulario de contacto
    const form = document.getElementById('contactForm');
    const feedback = document.getElementById('formFeedback');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        feedback.textContent = '✅ ¡Mensaje enviado! Te contactaremos pronto.';
        form.reset();
        setTimeout(() => feedback.textContent = '', 4000);
    });

    console.log('✅ app.js cargado correctamente');
});