/**
 * ============================================
 * ROUTES : AUTH
 * ============================================
 */

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authCtrl = require('../controllers/authController');
const authMiddleware = require('../middlewares/auth');

const registerValidation = [
  body('nom').trim().notEmpty().withMessage('Le nom est requis.'),
  body('prenom').trim().notEmpty().withMessage('Le prénom est requis.'),
  body('email').isEmail().withMessage('Email invalide.'),
  body('password').isLength({ min: 6 }).withMessage('Mot de passe min. 6 caractères.'),
];

router.post('/register', registerValidation, authCtrl.register);
router.post('/login', authCtrl.login);
router.get('/me', authMiddleware, authCtrl.getMe);

module.exports = router;