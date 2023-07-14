import express from 'express';
import getProblems from '../controllers/getproblems.js';
import { checkLogin, signup } from '../controllers/login_and_register.js';
const router = express.Router();


// router.post('/upload', upload.single('file'), uploadImage);
router.get('/getAllproblems', getProblems);
router.post('/login',checkLogin)
router.post('/register',signup)
export default router;