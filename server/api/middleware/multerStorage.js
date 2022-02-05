const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'controller/cert')
    },
    filename: (req, file, callBack) => {
        callBack(null, Date.now()+ '-' + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = [
        "image/jpg",
        "image/jpeg",
        "image/jfif",
        "image/pjpeg",
        "image/pjp",
        "image/png",
    ];
    allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb('File type not supported. Please select a png, jpg or jpeg.');
};

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10 //10 MB
    }, 
    fileFilter: fileFilter 
});

module.exports = upload;