/**
 * ============================================
 * ROUTES : PREDICATIONS
 * ============================================
 */

const express = require('express');
const router = express.Router();
const predCtrl = require('../controllers/predicationController');
const authMiddleware = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');
const upload = require('../middlewares/upload');

// Public
router.get('/', predCtrl.getAll);
router.get('/:id', predCtrl.getOne);

// Admin uniquement
router.post('/', authMiddleware, isAdmin, upload.single('fichier'), predCtrl.create);
router.put('/:id', authMiddleware, isAdmin, predCtrl.update);
router.delete('/:id', authMiddleware, isAdmin, predCtrl.delete);

module.exports = router;