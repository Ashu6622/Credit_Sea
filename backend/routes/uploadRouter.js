const express = require('express');
const router = express.Router();
const uploadXML = require('../controllers/uploadControllers.js')
const upload = require('../middlewares/multer.js');

router.post('/xml', upload.single('file'), uploadXML);

module.exports = router;