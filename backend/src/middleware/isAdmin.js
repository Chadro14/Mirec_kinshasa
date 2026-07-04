/**
 * ============================================
 * MIDDLEWARE : IS ADMIN
 * ============================================
 * Vérifie que l'utilisateur connecté est admin (pasteur)
 */

module.exports = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Accès réservé aux administrateurs.' });
  }
  next();
};