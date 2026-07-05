/**
 * ============================================
 * CONTROLLER : PRAYER REQUEST
 * ============================================
 */

const { PrayerRequest, User } = require('../models');

// GET /api/prayers
exports.getAll = async (req, res) => {
  try {
    const { statut } = req.query;
    const where = { est_publique: true };
    if (statut) where.statut = statut;

    const prayers = await PrayerRequest.findAll({
      where,
      include: [{ model: User, as: 'demandeur', attributes: ['id', 'nom', 'prenom'] }],
      order: [['createdAt', 'DESC']],
    });
    res.json({ prayers });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// POST /api/prayers
exports.create = async (req, res) => {
  try {
    const prayer = await PrayerRequest.create({
      ...req.body,
      user_id: req.user ? req.user.id : null,
    });
    res.status(201).json({ message: 'Votre demande de prière a été soumise.', prayer });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la soumission.', error: error.message });
  }
};

// POST /api/prayers/:id/prier
exports.incrementPriereurs = async (req, res) => {
  try {
    const prayer = await PrayerRequest.findByPk(req.params.id);
    if (!prayer) return res.status(404).json({ message: 'Demande introuvable.' });
    prayer.nb_prieurs += 1;
    await prayer.save();
    res.json({ message: 'Merci pour votre prière.', nb_prieurs: prayer.nb_prieurs });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// PUT /api/prayers/:id (admin)
exports.update = async (req, res) => {
  try {
    const prayer = await PrayerRequest.findByPk(req.params.id);
    if (!prayer) return res.status(404).json({ message: 'Demande introuvable.' });
    await prayer.update(req.body);
    res.json({ message: 'Demande mise à jour.', prayer });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour.', error: error.message });
  }
};

// DELETE /api/prayers/:id (admin)
exports.delete = async (req, res) => {
  try {
    const prayer = await PrayerRequest.findByPk(req.params.id);
    if (!prayer) return res.status(404).json({ message: 'Demande introuvable.' });
    await prayer.destroy();
    res.json({ message: 'Demande supprimée.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression.', error: error.message });
  }
};