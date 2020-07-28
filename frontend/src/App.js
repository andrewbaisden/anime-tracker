import React, { Fragment, useEffect, useState } from 'react';
import './App.css';

const App = () => {
	useEffect(() => {
		const getAPI = async () => {
			const response = await fetch('http://localhost:8080/');
			const data = await response.json();

			try {
				console.log(data);
				setLoading(false);
				setAnime(data);
			} catch (error) {
				console.log(error);
			}
		};
		getAPI();
	}, []);

	const [anime, setAnime] = useState([]);
	const [loading, setLoading] = useState(true);

	return (
		<Fragment>
			<header>
				<h1>My Anime List: React Front End</h1>
				<a href="http://localhost:8080">View All Anime</a>
				<a href="http://localhost:8080/add-anime">Add New Anime &#x27A2;</a>
			</header>

			<div className="container">
				{loading ? (
					<div>
						<p>No data to load</p>
					</div>
				) : (
					<div>
						{anime.map((data) => (
							<div key={data._id}>
								<main>
									<ul className="anime">
										<li>
											<img src={data.image} alt={data.name} className="anime-img" />
										</li>
										<li>
											<h1>{data.name}</h1>
										</li>

										<li>
											<a href={data._id}>View Anime &#x21DB;</a>
										</li>
									</ul>
								</main>
							</div>
						))}
					</div>
				)}
			</div>
			{/* <div>
				<h1>Add New Anime</h1>
				<form method="POST" action="http://localhost:8080/add-anime">
					<div>
						<label>Name</label>
						<input type="text" name="name" required />
					</div>
					<div>
						<label>Image</label>
						<input type="text" name="image" required />
					</div>
					<div>
						<label>Description</label>
						<input type="text" name="description" required />
					</div>

					<div>
						<button type="submit">Add Anime</button>
					</div>
				</form>
			</div> */}
		</Fragment>
	);
};

export default App;
