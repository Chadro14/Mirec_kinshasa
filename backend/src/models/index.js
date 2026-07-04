/**
 * ============================================
 * INDEX DES MODÈLES — Initialisation Sequelize
 * ============================================
 */

const { sequelize } = require('../config/database');
const User = require('./User');
const Predication = require('./Predication');
const Event = require('./Event');
const PrayerRequest = require('./PrayerRequest');
const Favorite = require('./Favorite');

const models = {
  User: User(sequelize),
  Predication: Predication(sequelize),
  Event: Event(sequelize),
  PrayerRequest: PrayerRequest(sequelize),
  Favorite: Favorite(sequelize),
};

// ============================================
// ASSOCIATIONS
// ============================================

models.User.hasMany(models.Predication, { foreignKey: 'user_id', as: 'predications' });
models.Predication.belongsTo(models.User, { foreignKey: 'user_id', as: 'auteur' });

models.User.hasMany(models.PrayerRequest, { foreignKey: 'user_id', as: 'demandes' });
models.PrayerRequest.belongsTo(models.User, { foreignKey: 'user_id', as: 'demandeur' });

models.User.belongsToMany(models.Predication, {
  through: models.Favorite,
  foreignKey: 'user_id',
  otherKey: 'predication_id',
  as: 'favoris',
});
models.Predication.belongsToMany(models.User, {
  through: models.Favorite,
  foreignKey: 'predication_id',
  otherKey: 'user_id',
  as: 'membres_favoris',
});

models.Favorite.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
models.Favorite.belongsTo(models.Predication, { foreignKey: 'predication_id', as: 'predication' });

module.exports = { sequelize, ...models };