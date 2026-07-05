/**
 * ============================================
 * INDEX DES ROUTES
 * ============================================
 */

const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const predicationRoutes = require('./predicationRoutes');
const eventRoutes = require('./eventRoutes');
const prayerRoutes = require('./prayerRoutes');

router.use('/auth', authRoutes);
router.use('/predications', predicationRoutes);
router.use('/events', eventRoutes);
router.use('/prayers', prayerRoutes);

// Route santé
router.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'API MIREC Kinshasa opérationnelle', timestamp: new Date() });
});

module.exports = router;