/**
 * ============================================
 * MODÈLE : PREDICATION
 * ============================================
 * Représente une prédication publiée par le pasteur
 * Types : 'audio' | 'video' | 'delivrance'
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Predication = sequelize.define('Predication', {
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
      type: DataTypes.ENUM('audio', 'video', 'delivrance'),
      allowNull: false,
      defaultValue: 'audio',
    },
    categorie: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    fichier_url: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    miniature_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    duree: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'Durée en secondes',
    },
    taille_fichier: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    nb_ecoutes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    nb_telechargements: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    statut: {
      type: DataTypes.ENUM('brouillon', 'publie', 'archive'),
      defaultValue: 'publie',
      allowNull: false,
    },
    date_publication: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    tags: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
  }, {
    tableName: 'predications',
    indexes: [
      { fields: ['statut'] },
      { fields: ['type'] },
      { fields: ['date_publication'] },
    ],
  });

  return Predication;
};