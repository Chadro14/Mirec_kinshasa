// pages/api/request-prier.js
// Ceci est un environnement Node.js !

// Vous pouvez importer ici des modules Node.js (comme 'fs' ou 'path') 
// ou des librairies de connexion à la base de données (comme 'mongoose' pour MongoDB)

export default async function handler(req, res) {
    
    // Assurez-vous que seule la méthode POST est autorisée pour la soumission
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Méthode ${req.method} non autorisée`);
    }

    try {
        // Les données envoyées par le formulaire React se trouvent dans req.body
        const { type, contenu, userId } = req.body; // 'type' = 'text' ou 'vocal', 'contenu' = le texte ou le lien du fichier.

        if (!contenu) {
            return res.status(400).json({ message: "Le contenu de la requête est manquant." });
        }
        
        // --- LOGIQUE NODE.JS DE STOCKAGE ---
        
        // 1. Validation de l'utilisateur (optionnel, via les sessions NextAuth)
        // const session = await getSession({ req });
        // if (!session) { return res.status(401).json({ message: "Non authentifié." }); }

        // 2. Préparation des données à stocker
        const prayerRequest = {
            userId: userId || 'Anonyme', // Si non connecté, marquer anonyme
            type: type,
            contenu: contenu,
            date: new Date(),
            statut: 'Non Lu' // Statut initial pour l'Admin
        };

        // 3. Intégration de la Base de Données (MongoDB)
        // C'est ici que le code Node.js se connecte à la DB et sauvegarde 'prayerRequest'
        console.log("Requête reçue, prête à être sauvegardée en Node.js :", prayerRequest);
        // await db.collection('requetes-priere').insertOne(prayerRequest);

        // Succès : Renvoyer une réponse au frontend (React)
        res.status(201).json({ 
            message: 'Votre requête de prière a été soumise avec succès. Dieu vous bénisse !',
            id: 'id_placeholder' // ID de l'enregistrement créé
        });

    } catch (error) {
        console.error("Erreur serveur lors de la soumission de prière :", error);
        res.status(500).json({ 
            message: "Erreur interne du serveur lors de la soumission. Veuillez réessayer." 
        });
    }
}
