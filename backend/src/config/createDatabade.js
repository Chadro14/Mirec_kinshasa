/**
 * ============================================
 * SCRIPT DE CRÉATION DE LA BASE DE DONNÉES
 * ============================================
 * Crée la BDD "mirec_kinshasa" si elle n'existe pas
 * Usage: node src/config/createDatabase.js
 */

const mysql = require('mysql2/promise');
require('dotenv').config();

const createDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    const dbName = process.env.DB_NAME;
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    console.log(`✅ Base de données "${dbName}" créée ou déjà existante.`);

    await connection.end();
  } catch (error) {
    console.error('❌ Erreur lors de la création de la BDD:', error.message);
    process.exit(1);
  }
};

createDatabase();