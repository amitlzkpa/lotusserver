require('dotenv').config(); // read .env files
const express = require('express');
const EqModel = require('./models/Equalizer.js');
const bodyparser = require('bodyparser');

const app = express();
const port = process.env.PORT || 4000;

// Use middlewares
app.use(bodyparser());

// Set public folder as root
app.use(express.static('public'));

// Allow front-end access to node_modules folder
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

// Serve homepage
app.get('/', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

// Add entry
app.post('/api/add', (req, res) => {

	res.send('OK');

});

// Listen for HTTP requests on port 4000
app.listen(port, () => {
	console.log('listening on %d', port);
});
