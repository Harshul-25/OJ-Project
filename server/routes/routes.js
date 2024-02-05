const express =require('express');
const {getProblems, getStatement} = require('../controllers/getproblems.js');
const { checkLogin, signup } = require ('../controllers/login_and_register.js');
const {runCode} = require('../controllers/runcode.js')
const {submitCode} = require('../controllers/submitcode.js')
const {getSubs} = require('../controllers/getSubmissions.js')
const {checkToken} = require('../checkToken.js')
const router = express.Router();
// const {getTestcases} = require('../getTestcases.js')

const path = __dirname + '../views/';
router.get('/', function (req,res) {
    res.sendFile(path + "index.html");
});

router.get('/getAllproblems',checkToken, getProblems);
router.post('/getstatement',checkToken,getStatement)
router.post('/login',checkLogin)
router.post('/signup',signup)
router.post('/run',checkToken,runCode)
router.post('/submit',checkToken,submitCode)
router.post('/getsubmissions',checkToken,getSubs)

module.exports = {router}