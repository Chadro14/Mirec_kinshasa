/**
 * ============================================
 * CONTROLLER : AUTH (Inscription / Connexion)
 * ============================================
 */

const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { User } = require('../models');

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

// POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nom, prenom, email, telephone, password } = req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: 'Un compte existe déjà avec cet email.' });
    }

    const user = await User.create({
      nom, prenom, email, telephone, password, role: 'member',
    });

    const token = generateToken(user);
    res.status(201).json({
      message: 'Inscription réussie.',
      user: user.toSafeJSON(),
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'inscription.', error: error.message });
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis.' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user || !user.actif) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
    }

    const token = generateToken(user);
    res.json({
      message: 'Connexion réussie.',
      user: user.toSafeJSON(),
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la connexion.', error: error.message });
  }
};

// GET /api/auth/me
exports.getMe = async (req, res) => {
  try {
    res.json({ user: req.user.toSafeJSON() });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};