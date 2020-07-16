const Anime = require('../models/Anime');

exports.getIndex = (req, res) => {
	res.status(200).render('index');
};

exports.getEditAnime = (req, res) => {
	res.status(200).render('edit-anime');
};

exports.postAnime = (req, res) => {
	const { name, image, description } = req.body;

	const anime = new Anime({ name: name, image: image, description: description });
	anime.save();
	console.log('Anime Added to the database');
	res.status(201).redirect('/');
};
