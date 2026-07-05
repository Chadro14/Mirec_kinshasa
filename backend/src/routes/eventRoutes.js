/**
 * ============================================
 * ROUTES : EVENTS
 * ============================================
 */

const express = require('express');
const router = express.Router();
const eventCtrl = require('../controllers/eventController');
const authMiddleware = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');

// Public
router.get('/', eventCtrl.getAll);
router.get('/:id', eventCtrl.getOne);

// Admin
router.post('/', authMiddleware, isAdmin, eventCtrl.create);
router.put('/:id', authMiddleware, isAdmin, eventCtrl.update);
router.delete('/:id', authMiddleware, isAdmin, eventCtrl.delete);

module.exports = router;