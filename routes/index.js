const express = require('express');
const router = express.Router();

const { upload, downloadFile } = require('../controllers/uploadController');

router.get('/', (req, res, next) => {
	res.render('index');
});

router.post('/upload', upload);

router.get('/download', downloadFile);

module.exports = router;
