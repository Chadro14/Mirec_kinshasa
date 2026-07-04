/**
 * ============================================
 * MODÈLE : FAVORITE (Favoris)
 * ============================================
 * Permet à un membre de sauvegarder ses prédications préférées
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Favorite = sequelize.define('Favorite', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    predication_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Note personnelle du membre',
    },
  }, {
    tableName: 'favorites',
    indexes: [
      { unique: true, fields: ['user_id', 'predication_id'] },
    ],
  });

  return Favorite;
};