const express = require ('express');
const cors = require ('cors');
const {router} = require('./routes/routes.js');
const {DBConnection} = require ('./db.js');

const app = express();

const path = __dirname + '/views/';

app.use(cors());
app.use(express.static(path));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', router);

const PORT = process.env.PORT || 8000;

DBConnection();

app.listen(PORT,'0.0.0.0',() => console.log(`Server is running on PORT ${PORT}`));