const multer = require('multer');
const path = require('path');
const { TesseractWorker } = require('tesseract.js');

exports.worker = new TesseractWorker({
	langPath: path.join(__dirname, '..', 'lang-data')
});
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads');
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + file.originalname.slice(-6));
	}
});

exports.uploadCloud = multer({ storage: storage }).single('avatar');
