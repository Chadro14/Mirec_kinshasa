/**
 * ============================================
 * MIDDLEWARE : UPLOAD (Multer)
 * ============================================
 * Gère l'upload des fichiers audio/vidéo/images
 */

const multer = require('multer');
const path = require('path');
const fs = require('fs');

const audioDir = path.join(__dirname, '../uploads/audio');
const videoDir = path.join(__dirname, '../uploads/video');
const imageDir = path.join(__dirname, '../uploads/images');

[audioDir, videoDir, imageDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith('audio/')) cb(null, audioDir);
    else if (file.mimetype.startsWith('video/')) cb(null, videoDir);
    else if (file.mimetype.startsWith('image/')) cb(null, imageDir);
    else cb(new Error('Type de fichier non supporté'), false);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/x-m4a',
    'video/mp4', 'video/webm', 'video/ogg',
    'image/jpeg', 'image/png', 'image/webp',
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Type de fichier non autorisé: ' + file.mimetype), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: process.env.MAX_FILE_SIZE || 104857600,
  },
});

module.exports = upload;