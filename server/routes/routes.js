const express =require('express');
const {getProblems} = require('../controllers/getproblems.js');
const { checkLogin, signup } = require ('../controllers/login_and_register.js');
const {runCode} = require('../controllers/runcode.js')
const router = express.Router();


router.get('/getAllproblems', getProblems);
router.post('/login',checkLogin)
router.post('/register',signup)
router.post('/run',runCode)

module.exports = {router}