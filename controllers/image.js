const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '2f1813404a2e49459c4173ce97feea37'
});

const handleApiCall = (req, res) => {
	app.models
	.predict('c0c0ac362b03416da06ab3fa36fb58e3', req.body.input) //Clarifai.FACE_DETECT_MODEL
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	// let found = false;
	// database.users.forEach(user => {
	// 	if (user.id === id) {
	// 		found = true;
	// 		user.entries++
	// 		return res.json(user.entries);
	// 	}
	// })
	// if(!found) {
	// 	res.status(400).json('user not found')
	// }
	db('users').where('id', '=', id)
  	.increment('entries', 1)
  	.returning('entries')
  	.then(entries => {
  		res.json(entries[0]);
  	})
  	.catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
};