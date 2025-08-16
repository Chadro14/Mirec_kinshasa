<script>
    // Citations qui changent
    const citations = [
        "Le véritable amour est un choix, pas seulement un sentiment.",
        "La foi n'est pas l'absence de doute, c'est le courage d'y faire face.",
        "Soyez le changement que vous voulez voir dans le monde.",
        "Chaque pas dans la foi est un pas de plus vers la bénédiction.",
        "La persévérance est la clé de la réussite dans toutes les épreuves."
    ];

    const citationElement = document.getElementById('citation');
    let index = 0;

    function afficherCitation() {
        citationElement.textContent = citations[index];
        index = (index + 1) % citations.length;
    }

    // Afficher la première citation immédiatement
    afficherCitation();

    // Changer de citation toutes les 5 secondes
    setInterval(afficherCitation, 5000);

    // Code pour le menu hamburger
    document.getElementById('hamburger').addEventListener('click', function() {
        document.getElementById('sidebar').classList.toggle('active');
        this.classList.toggle('active');
    });

    // Code pour le bouton "Comment vous sentez-vous ?"
    document.getElementById('toggleMoodButton').addEventListener('click', function(event) {
        event.preventDefault(); // Empêche le lien de recharger la page
        const moodContent = document.getElementById('moodContent');
        moodContent.classList.toggle('mood-content-hidden');
        moodContent.classList.toggle('mood-content-visible');
    });
</script>
