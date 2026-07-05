/**
 * ============================================
 * ROUTES : PRAYER REQUESTS
 * ============================================
 */

const express = require('express');
const router = express.Router();
const prayerCtrl = require('../controllers/prayerController');
const authMiddleware = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');

// Public
router.get('/', prayerCtrl.getAll);
router.post('/', prayerCtrl.create);
router.post('/:id/prier', prayerCtrl.incrementPriereurs);

// Admin
router.put('/:id', authMiddleware, isAdmin, prayerCtrl.update);
router.delete('/:id', authMiddleware, isAdmin, prayerCtrl.delete);

module.exports = router;