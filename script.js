document.addEventListener('DOMContentLoaded', function() {
    // Rend la page visible avec un effet de fondu après le chargement
    const container = document.querySelector('.container');
    container.classList.add('loaded');

    // Gère le clic du bouton "Commencer"
    const startButton = document.getElementById('startButton');
    if (startButton) {
        startButton.addEventListener('click', function(event) {
            event.preventDefault(); // Empêche la redirection immédiate

            // Affiche l'écran de chargement
            const loadingOverlay = document.getElementById('loadingOverlay');
            loadingOverlay.style.display = 'flex';

            // Redirige vers la page dashboard.html après 3 secondes
            setTimeout(function() {
                window.location.href = 'dashboard.html';
            }, 3000);
        });
    }
});
