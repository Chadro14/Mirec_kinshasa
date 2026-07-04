/**
 * ============================================
 * MODÈLE : PRAYER REQUEST (Demande de prière)
 * ============================================
 * Représente une demande de prière soumise par un membre
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const PrayerRequest = sequelize.define('PrayerRequest', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    titre: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    contenu: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    nom_demandeur: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    email_demandeur: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    telephone_demandeur: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    est_anonyme: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    est_publique: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    statut: {
      type: DataTypes.ENUM('en_attente', 'en_cours', 'exaucee', 'fermee'),
      defaultValue: 'en_attente',
    },
    reponse_pasteur: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    nb_prieurs: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    tableName: 'prayer_requests',
    indexes: [
      { fields: ['statut'] },
      { fields: ['est_publique'] },
    ],
  });

  return PrayerRequest;
};