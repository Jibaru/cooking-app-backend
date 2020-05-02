const express = require('express');
const path = require('path');

const app = express();
const bodyParser = require('body-parser');

// BodyParser Library
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes Global Config
app.use(require('./routes/index'));

app.use(express.static(path.resolve(__dirname, '../public')));

app.listen(3000, () => {
	console.log('Escuchando en el puerto 3000');
});