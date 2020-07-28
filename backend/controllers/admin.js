const Anime = require('../models/Anime');

exports.getIndex = async (req, res) => {
	const anime = await Anime.find((data) => data);

	try {
		console.log(anime);
		// Data rendered as an object and passed down into index.ejs
		res.status(200).render('index', { anime: anime });

		// Data returned as json so a fetch/axios requst can get it
		// res.json(anime);
	} catch (error) {
		console.log(error);
	}
};

exports.getAnime = async (req, res) => {
	const animeId = req.params.animeId;

	const anime = await Anime.findById(animeId, (anime) => anime);

	try {
		console.log(anime);
		res.status(200).render('anime', { anime: anime });
	} catch (error) {
		console.log(error);
	}
};

exports.getAddAnime = (req, res) => {
	res.status(200).render('edit-anime', { editing: false });
};

exports.getEditAnime = async (req, res) => {
	const animeId = req.params.animeId;

	const editMode = req.query.edit;

	if (!editMode) {
		return res.redirect('/');
	}

	const anime = await Anime.findById(animeId);

	try {
		if (!animeId) {
			return res.redirect('/');
		}
		console.log(anime);
		res.status(200).render('edit-anime', { anime: anime, editing: editMode });
	} catch (error) {
		console.log(error);
	}
};

exports.postAnime = (req, res) => {
	const { name, image, description } = req.body;

	const anime = new Anime({ name: name, image: image, description: description });
	anime.save();
	console.log('Anime Added to the database');

	// Updated the home route to the React App index page
	// res.status(201).redirect('http://localhost:3000/');

	// Home route for ejs index page
	res.status(201).redirect('/');
};

exports.postEditAnime = (req, res) => {
	const animeId = req.body.animeId;
	const { name, image, description } = req.body;

	Anime.findById(animeId)
		.then((anime) => {
			anime.name = name;
			anime.image = image;
			anime.description = description;

			return anime.save();
		})
		.then(() => {
			console.log('Item Updated');
			res.status(201).redirect(`/${animeId}`);
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postDelete = async (req, res) => {
	const animeId = req.body.animeId;

	const anime = await Anime.findByIdAndRemove(animeId, (data) => data);

	try {
		console.log(anime);
		console.log('Item Deleted');
		res.redirect('/');
	} catch (error) {
		console.log(error);
	}
};
