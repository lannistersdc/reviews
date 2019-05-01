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
app.use('/loaderio-310e0fa00ddae327d9f06de1023bc6d5', (req, res) => {
    res.status(200).send('loaderio-310e0fa00ddae327d9f06de1023bc6d5');
})

app.listen(port, () => console.log(`Listening on port ${port}`));
