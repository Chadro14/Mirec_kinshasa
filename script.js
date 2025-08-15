document.addEventListener('DOMContentLoaded', function() {
    // Rend la page visible avec un effet de fondu après le chargement
    const container = document.querySelector('.container');
    container.style.opacity = '1';

    // Ajoute une animation au clic du bouton "Commencer"
    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', function(event) {
        event.preventDefault();
        
        // Ajoute la classe d'animation "pop"
        startButton.classList.add('pop');

        // Retire la classe après l'animation pour pouvoir la relancer
        setTimeout(() => {
            startButton.classList.remove('pop');
            // Vous pouvez ajouter une redirection ici si besoin
            // Exemple : window.location.href = 'nom_de_votre_prochaine_page.html';
        }, 500); // 500ms, la durée de l'animation CSS
    });
});
