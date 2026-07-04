/**
 * ============================================
 * MODÈLE : EVENT (Événement)
 * ============================================
 * Représente un événement de l'église
 * Types : 'culte', 'veillée', 'prière', 'évangélisation', 'conférence'
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Event = sequelize.define('Event', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    titre: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM('culte', 'veillée', 'prière', 'évangélisation', 'conférence', 'autre'),
      allowNull: false,
      defaultValue: 'culte',
    },
    date_debut: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    date_fin: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    lieu: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    adresse: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    image_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    nb_participants_max: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    nb_inscrits: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    inscription_ouverte: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    statut: {
      type: DataTypes.ENUM('a_venir', 'en_cours', 'termine', 'annule'),
      defaultValue: 'a_venir',
    },
  }, {
    tableName: 'events',
    indexes: [
      { fields: ['date_debut'] },
      { fields: ['statut'] },
    ],
  });

  return Event;
};