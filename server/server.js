const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const router = require('./router.js');

const app = express();

const port = process.env.PORT || 3004;

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../public/')));
app.use('/api', router);
app.use('/loaderio-2fc30578d2833b95ad503c958cd72acd', (req, res) => {
    res.status(200).send('loaderio-2fc30578d2833b95ad503c958cd72acd');
})

app.listen(port, () => console.log(`Listening on port ${port}`));
