const express = require('express');
const router = express.Router();
const {getAllData, getUniqueData, deleteData} = require('../controllers/reportControllers')

router.get('/all-data', getAllData);
router.get('/get-single/:id', getUniqueData);
router.delete('/delete/:id', deleteData);

module.exports = router;