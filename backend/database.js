/**
 * ============================================
 * CONFIGURATION BASE DE DONNÉES (Sequelize)
 * ============================================
 * Connexion à MySQL via Sequelize
 */

const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      timestamps: true,
      underscored: false,
    },
  }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion à la base de données réussie.');
  } catch (error) {
    console.error('❌ Impossible de se connecter à la base de données:', error.message);
    console.error('💡 Vérifie que MySQL est démarré et que tes identifiants dans .env sont corrects.');
    process.exit(1);
  }
};

module.exports = { sequelize, testConnection };