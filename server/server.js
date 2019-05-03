const express = require('express');
const bodyParser = require('body-parser');
// const morgan = require('morgan');
const path = require('path');

const router = require('./router.js');

const app = express();

const port = process.env.PORT || 3004;

// app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../public/')));
app.use('/api', router);
app.use('/loaderio-15f05c247bd03ea8ccfe1fdc545eea5f', (req, res) => {
    res.status(200).send('loaderio-15f05c247bd03ea8ccfe1fdc545eea5f');
})

app.listen(port, () => console.log(`Listening on port ${port}`));
