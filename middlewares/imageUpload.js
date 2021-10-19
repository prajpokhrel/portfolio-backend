const multer = require('multer');
const uuid = require('uuid');

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
};

const imageUpload = multer({
    limits: 500000,
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, 'assets/images');
        },
        filename: (req, file, callback) => {
            const extension = MIME_TYPE_MAP[file.mimetype]
            callback(null, uuid.v1() + '.' + extension);
        }
    }),
    fileFilter: (req, file, callback) => {
        const isValid = !!MIME_TYPE_MAP[file.mimetype];
        let error = isValid ? null : "Invalid Mime Type";
        callback(error, isValid);
    }
});

module.exports = imageUpload;