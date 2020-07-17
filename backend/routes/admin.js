const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/', adminController.getIndex);

router.get('/add-anime', adminController.getAddAnime);

router.get('/edit-anime/:animeId', adminController.getEditAnime);

router.post('/add-anime', adminController.postAnime);

router.post('/edit-anime', adminController.postEditAnime);

router.get('/:animeId', adminController.getAnime);

router.post('/delete', adminController.postDelete);

module.exports = router;
