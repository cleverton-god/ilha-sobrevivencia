/* =============================================
   SCRIPT - SOBREVIVÊNCIA NA ILHA
   JavaScript puro (Vanilla JS)
   Funcionalidades: Partículas, Animações, Navegação
   ============================================= */

document.addEventListener("DOMContentLoaded", () => {
    console.log("Projeto Ilha carregado!");
    
    // Inicializa o sistema de partículas
    initParticles();
    
    // Inicializa o Intersection Observer para animações
    initScrollAnimations();
    
    // Configura navegação pelos cards
    initCardNavigation();
    
    // Configura navegação entre páginas de dia
    setupDayNavigation();
});

/* ---------------------------------------------
   SISTEMA DE PARTÍCULAS FLUTUANTES
   Cria flocos/partículas animadas no header
--------------------------------------------- */
function initParticles() {
    const container = document.getElementById('particles-container');
    
    // Verifica se o container existe
    if (!container) return;
    
    // Configurações das partículas
    const particleCount = 50; // Número de partículas
    const particles = [];
    
    // Cria as partículas
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Propriedades aleatórias para cada partícula
        const size = Math.random() * 6 + 2; // Tamanho entre 2px e 8px
        const positionX = Math.random() * 100; // Posição horizontal
        const duration = Math.random() * 20 + 15; // Duração da animação
        const delay = Math.random() * 10; // Atraso inicial
        const opacity = Math.random() * 0.5 + 0.1; // Opacidade
        
        // Aplica as propriedades
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${positionX}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.opacity = opacity;
        
        // Cores variadas (branco, azul, roxo)
        const colors = [
            'rgba(255, 255, 255, 0.3)',
            'rgba(79, 70, 229, 0.4)',
            'rgba(0, 224, 255, 0.3)'
        ];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        container.appendChild(particle);
        particles.push(particle);
    }
}

/* ---------------------------------------------
   INTERSECTION OBSERVER - Fade-in ao rolar
   Anima elementos quando entram na viewport
--------------------------------------------- */
function initScrollAnimations() {
    // Seleciona todos os elementos com classe 'fade-in'
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Configura o Intersection Observer
    const observerOptions = {
        root: null, // Usa o viewport
        rootMargin: '0px',
        threshold: 0.1 // Ativa quando 10% do elemento está visível
    };
    
    // Callback quando elementos entram na viewport
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adiciona classe 'visible' para ativar a animação
                entry.target.classList.add('visible');
                
                // Para de observar após a animação (opcional)
                observer.unobserve(entry.target);
            }
        });
    };
    
    // Cria o observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observa cada elemento
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

/* ---------------------------------------------
   NAVEGAÇÃO PELOS CARDS
   Permite clicar nos cards para navegar
--------------------------------------------- */
function initCardNavigation() {
    const dayCards = document.querySelectorAll('.day-card');
    
    dayCards.forEach(card => {
        // Adiciona suporte ao clique
        card.addEventListener('click', () => {
            const day = card.getAttribute('onclick');
            if (day) {
                const dayNumber = day.match(/\d+/)[0];
                navigateTo(dayNumber);
            }
        });
        
        // Adiciona suporte ao teclado (Enter)
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const day = card.getAttribute('onclick');
                if (day) {
                    const dayNumber = day.match(/\d+/)[0];
                    navigateTo(dayNumber);
                }
            }
        });
    });
}

/* ---------------------------------------------
   FUNÇÃO DE NAVEGAÇÃO GLOBAL
   Redireciona para a página do dia especificado
--------------------------------------------- */
window.navigateTo = function(day) {
    window.location.href = `dia${day}.html`;
};

/* ---------------------------------------------
   NAVEGAÇÃO ENTRE DIAS
   Adiciona botões prev/next nas páginas de dia
--------------------------------------------- */
function setupDayNavigation() {
    // Verifica se estamos em uma página de dia
    const path = window.location.pathname;
    const dayMatch = path.match(/dia(\d+)\.html/);
    
    if (!dayMatch) return;
    
    const currentDay = parseInt(dayMatch[1]);
    const navContainer = document.getElementById('navigation');
    
    if (navContainer) {
        let navHTML = '';
        
        // Botão Dia Anterior
        if (currentDay > 1) {
            navHTML += `<a href="dia${currentDay - 1}.html" class="btn btn-nav">
                <i class="fas fa-arrow-left"></i> Dia Anterior
            </a>`;
        }
        
        // Botão Início
        navHTML += `<a href="index.html" class="btn">
            <i class="fas fa-home"></i> Início
        </a>`;
        
        // Botão Próximo Dia
        if (currentDay < 10) {
            navHTML += `<a href="dia${currentDay + 1}.html" class="btn btn-nav">
                Próximo Dia <i class="fas fa-arrow-right"></i>
            </a>`;
        }
        
        navContainer.innerHTML = navHTML;
    }
}

