/**
 * ============================================
 * CONTROLLER : PREDICATION
 * ============================================
 */

const { Predication, User } = require('../models');

// GET /api/predications — Liste publique
exports.getAll = async (req, res) => {
  try {
    const { type, categorie, search, limit = 20, page = 1 } = req.query;
    const where = { statut: 'publie' };

    if (type) where.type = type;
    if (categorie) where.categorie = categorie;
    if (search) {
      const { Op } = require('sequelize');
      where[Op.or] = [
        { titre: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
      ];
    }

    const offset = (page - 1) * limit;
    const { count, rows } = await Predication.findAndCountAll({
      where,
      include: [{ model: User, as: 'auteur', attributes: ['id', 'nom', 'prenom', 'avatar'] }],
      order: [['date_publication', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.json({
      total: count,
      pages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      predications: rows,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// GET /api/predications/:id
exports.getOne = async (req, res) => {
  try {
    const predication = await Predication.findOne({
      where: { id: req.params.id, statut: 'publie' },
      include: [{ model: User, as: 'auteur', attributes: ['id', 'nom', 'prenom', 'avatar'] }],
    });
    if (!predication) return res.status(404).json({ message: 'Prédication introuvable.' });

    predication.nb_ecoutes += 1;
    await predication.save();

    res.json(predication);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// POST /api/predications (admin)
exports.create = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Fichier audio/vidéo requis.' });
    }

    const { titre, description, type, categorie, tags, statut } = req.body;
    const fichier_url = `/uploads/${req.file.mimetype.startsWith('audio/') ? 'audio' : 'video'}/${req.file.filename}`;

    const predication = await Predication.create({
      titre, description, type: type || 'audio',
      categorie, tags, statut: statut || 'publie',
      fichier_url, taille_fichier: req.file.size,
      user_id: req.user.id,
    });

    res.status(201).json({ message: 'Prédication créée avec succès.', predication });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création.', error: error.message });
  }
};

// PUT /api/predications/:id (admin)
exports.update = async (req, res) => {
  try {
    const predication = await Predication.findByPk(req.params.id);
    if (!predication) return res.status(404).json({ message: 'Prédication introuvable.' });

    const { titre, description, type, categorie, tags, statut } = req.body;
    await predication.update({ titre, description, type, categorie, tags, statut });
    res.json({ message: 'Prédication mise à jour.', predication });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour.', error: error.message });
  }
};

// DELETE /api/predications/:id (admin)
exports.delete = async (req, res) => {
  try {
    const predication = await Predication.findByPk(req.params.id);
    if (!predication) return res.status(404).json({ message: 'Prédication introuvable.' });
    await predication.destroy();
    res.json({ message: 'Prédication supprimée.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression.', error: error.message });
  }
};