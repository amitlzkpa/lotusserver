require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Eq = require('./models/Equalizer.js');

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());

let mongoURI = `mongodb://${process.env.MONGO_ID}:${process.env.MONGO_PWD}@ds229609.mlab.com:29609/lotusserver`;
mongoose.connect(mongoURI);

app.use(express.static('public'));

app.use('/scripts', express.static(`${__dirname}/node_modules/`));

app.get('/', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.post('/api/add', async function(req, res) {
	console.log(req.body);

	let newEq = new Eq(req.body);

	// console.log(newEq);

	let savedEq = await newEq.save();
	console.log(savedEq);

	res.send(savedEq);

});

// Listen for HTTP requests on port 4000
app.listen(port, () => {
	console.log('listening on %d', port);
});
