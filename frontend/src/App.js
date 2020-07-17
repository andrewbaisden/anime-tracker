import React, { Fragment, useEffect, useState } from 'react';

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
			<h1>Anime Home</h1>

			<div>
				{loading ? (
					<div>Loading</div>
				) : (
					<div>
						{anime.map((data) => (
							<div key={data._id}>
								<ul>
									<li>
										<h1>
											<a href="/{data.id}">{data._id}</a>
										</h1>
									</li>
									<li>
										<img src={data.image} alt={data.name} />
									</li>
									<li>
										<p>{data.description}</p>
									</li>
								</ul>
							</div>
						))}
					</div>
				)}
			</div>
			<div>
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
			</div>
		</Fragment>
	);
};

export default App;
