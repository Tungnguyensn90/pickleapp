const multer = require('multer');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure storage for regular avatars
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Configure storage for chibi avatars
const chibiStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const chibiDir = path.join(uploadsDir, 'chibi');
    if (!fs.existsSync(chibiDir)) {
      fs.mkdirSync(chibiDir, { recursive: true });
    }
    cb(null, chibiDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'chibi-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter function
const fileFilter = (req, file, cb) => {
  // Check file type
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Chỉ chấp nhận file hình ảnh!'), false);
  }
};

// Create multer instances
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

const uploadChibi = multer({
  storage: chibiStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit for chibi processing
  }
});

module.exports = {
  upload,
  uploadChibi
}; 