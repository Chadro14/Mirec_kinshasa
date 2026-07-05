/**
 * ============================================
 * CONTROLLER : EVENT
 * ============================================
 */

const { Event } = require('../models');

// GET /api/events
exports.getAll = async (req, res) => {
  try {
    const { type, statut = 'a_venir', limit = 20, page = 1 } = req.query;
    const where = {};
    if (type) where.type = type;
    if (statut) where.statut = statut;

    const offset = (page - 1) * limit;
    const { count, rows } = await Event.findAndCountAll({
      where,
      order: [['date_debut', 'ASC']],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.json({ total: count, events: rows });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// GET /api/events/:id
exports.getOne = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: 'Événement introuvable.' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// POST /api/events (admin)
exports.create = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json({ message: 'Événement créé.', event });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création.', error: error.message });
  }
};

// PUT /api/events/:id (admin)
exports.update = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: 'Événement introuvable.' });
    await event.update(req.body);
    res.json({ message: 'Événement mis à jour.', event });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour.', error: error.message });
  }
};

// DELETE /api/events/:id (admin)
exports.delete = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: 'Événement introuvable.' });
    await event.destroy();
    res.json({ message: 'Événement supprimé.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression.', error: error.message });
  }
};