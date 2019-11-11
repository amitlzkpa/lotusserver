require('dotenv').config();
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const schedule = require('node-schedule');
const Arweave = require('arweave/node');


const Eq = require('./models/Equalizer.js');





const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors());

let mongoURI = `mongodb://${process.env.MONGO_ID}:${process.env.MONGO_PWD}@ds229609.mlab.com:29609/lotusserver`;
mongoose.connect(mongoURI);





let arweave = Arweave.init({
    host: 'arweave.net',// Hostname or IP address for a Arweave host
    port: 443,          // Port
    protocol: 'https',  // Network protocol http or https
    timeout: 20000,     // Network request timeouts in milliseconds
    logging: false,     // Enable network request logging
});


let keyLoc = `./keys/default.json`;
let jwk = JSON.parse(fs.readFileSync(keyLoc));



app.use(express.static('public'));
// app.use('/scripts', express.static(`${__dirname}/node_modules/`));


let j = schedule.scheduleJob('*/1 * * * *', async function(fireDate){
	console.log('-------------------');
	console.log(`Starting task at: ${fireDate}`);
	let allSubmitted = await Eq.find({});
	for (let idx=0; idx<allSubmitted.length; idx++) {
		let eq = allSubmitted[idx];
		let tx_details = await arweave.transactions.get(eq.tx, jwk)
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
