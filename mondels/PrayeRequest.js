// models/PrayerRequest.js

import mongoose from 'mongoose';

const PrayerRequestSchema = new mongoose.Schema({
  type: {
    type: String, // 'text' ou 'vocal'
    required: [true, 'Le type de requête est requis.'],
  },
  contenu: {
    type: String, // Le texte ou l'URL du fichier vocal
    required: [true, 'Le contenu est requis.'],
  },
  userId: {
    type: String, // ID de l'utilisateur connecté (si applicable)
    default: 'Anonyme',
  },
  statut: {
    type: String, // 'Non Lu', 'En Cours', 'Terminé'
    default: 'Non Lu',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Empêche de redéfinir le modèle lors des reloads de Next.js
export default mongoose.models.PrayerRequest || mongoose.model('PrayerRequest', PrayerRequestSchema);
