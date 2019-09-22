const fs = require('fs');
const path = require('path');
const { uploadCloud, worker } = require('../config/tesseractConfig');

exports.upload = (req, res) => {
	uploadCloud(req, res, (err) => {
		fs.readFile(`${req.file.path}`, (err, data) => {
			if (err) return console.log('Error: ' + err);
			worker
				.recognize(data, 'spa', { tessjs_create_pdf: '1' })
				.progress((progress) => {
					console.log(progress);
				})
				.then((result) => {
					res.redirect('/download');
				})
				.finally(() => worker.terminate());
		});
	});
};

exports.downloadFile = (req, res) => {
	const file = `${path.join(__dirname, '..', '/tesseract.js-ocr-result.pdf')}`;
	res.download(file);
};
