require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const schedule = require('node-schedule');

const Eq = require('./models/Equalizer.js');

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors());

let mongoURI = `mongodb://${process.env.MONGO_ID}:${process.env.MONGO_PWD}@ds229609.mlab.com:29609/lotusserver`;
mongoose.connect(mongoURI);



app.use(express.static('public'));
// app.use('/scripts', express.static(`${__dirname}/node_modules/`));


let j = schedule.scheduleJob('*/15 * * * *', async function(fireDate){
	console.log('-------------------');
	console.log(`Starting task at: ${fireDate}`);
	let allSubmitted = await Eq.find({});
	for (let idx=0; idx<allSubmitted.length; idx++) {
		let eq = allSubmitted[idx];
		let tx_details = await arweave.transactions.get(eq.tx)
		console.log(tx_details);
	}

	console.log(`Completed task at: ${Date.now}`);
	console.log('-------------------');

});




app.post('/api/add', async function(req, res) {

	try {

		let newEq = new Eq(req.body);
		let savedEq = await newEq.save();
		res.json(savedEq);

	} catch(ex) {
		console.log(ex);
		res.json(null);
	}

});



app.get('/api/get-all', async function(req, res) {

	try {

		let ret = await Eq.find({});
		res.json(ret);

	} catch(ex) {
		console.log(ex);
		res.json(null);
	}

});



app.get('*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

// Listen for HTTP requests on port 4000
app.listen(port, () => {
	console.log('listening on %d', port);
});
