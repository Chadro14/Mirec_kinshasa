/**
 * ============================================
 * SERVEUR PRINCIPAL — MIREC KINSHASA API
 * ============================================
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const { sequelize, testConnection } = require('./config/database');
require('./models'); // Initialise les modèles et associations

const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

// =====================
// MIDDLEWARES GLOBAUX
// =====================
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Servir les fichiers uploadés statiquement
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Logger simple
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
});

// =====================
// ROUTES
// =====================
app.use('/api', routes);

// Route racine
app.get('/', (req, res) => {
  res.json({
    name: 'MIREC Kinshasa API',
    version: '1.0.0',
    description: 'API pour l\'Église Missionnaire de Réveil et d\'Évangélisation',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      predications: '/api/predications',
      events: '/api/events',
      prayers: '/api/prayers',
    },
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route introuvable.', path: req.path });
});

// Erreur globale
app.use((err, req, res, next) => {
  console.error('❌ Erreur:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Erreur serveur interne.',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// =====================
// DÉMARRAGE
// =====================
const start = async () => {
  try {
    await testConnection();
    await sequelize.sync({ alter: true });
    console.log('✅ Modèles synchronisés avec la base de données.');

    app.listen(PORT, () => {
      console.log(`\n🚀 Serveur MIREC démarré sur http://localhost:${PORT}`);
      console.log(`📖 API disponible sur http://localhost:${PORT}/api`);
      console.log(`🌍 Environnement: ${process.env.NODE_ENV || 'development'}\n`);
    });
  } catch (error) {
    console.error('❌ Impossible de démarrer le serveur:', error);
    process.exit(1);
  }
};

start();