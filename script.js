document.addEventListener("DOMContentLoaded", () => {
    console.log("Projeto Ilha carregado!");

    // Botões do menu inicial
    const btns = document.querySelectorAll(".btn-dia");

    btns.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            window.location.href = `dia${index + 1}.html`;
        });
    });

    // Função global para navegação pelos cards
    window.navigateTo = function(day) {
        window.location.href = `dia${day}.html`;
    };

    // Adicionar navegação prev/next nas páginas de dia
    setupDayNavigation();
});

function setupDayNavigation() {
    // Verificar se estamos em uma página de dia
    const path = window.location.pathname;
    const dayMatch = path.match(/dia(\d+)\.html/);
    
    if (!dayMatch) return;

    const currentDay = parseInt(dayMatch[1]);
    const navContainer = document.getElementById('navigation');

    if (navContainer) {
        // Criar botões de navegação
        let navHTML = '';

        if (currentDay > 1) {
            navHTML += `<a href="dia${currentDay - 1}.html" class="btn btn-nav">⬅ Dia Anterior</a>`;
        }

        navHTML += `<a href="index.html" class="btn">🏠 Início</a>`;

        if (currentDay < 10) {
            navHTML += `<a href="dia${currentDay + 1}.html" class="btn btn-nav">Próximo Dia ➡</a>`;
        }

        navContainer.innerHTML = navHTML;
    }
}
