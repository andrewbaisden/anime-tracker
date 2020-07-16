const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const adminRoute = require('./routes/admin');

const app = express();

app.use(cors());

app.set('view engine', 'ejs');
app.set('views', './src/pages');

app.use(express.urlencoded({ extended: false }));

app.use('/static', express.static(path.join(`${__dirname}/public`)));

app.use('/', adminRoute);

const port = process.env.PORT || 8080;

mongoose
	.connect(process.env.DB_HOST, {
		useCreateIndex: true,
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useFindAndModify: false,
	})
	.then(() => {
		app.listen(port, () => console.log(`Server and Database running on ${port}, http://localhost:${port}`));
	})
	.catch((err) => {
		console.log(err);
	});
