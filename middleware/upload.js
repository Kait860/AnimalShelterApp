const multer = require('multer');
const path = require('path');

// Configure how uploaded files are stored on disk.
const storage = multer.diskStorage({
    // Save uploaded files in the uploads folder.
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    // Create a unique filename while keeping the original file extension.
    filename:(req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

// Accept only image uploads.
const fileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

// Export the configured upload middleware for route use.
const upload = multer({
    storage,
    fileFilter
});

module.exports=upload;
