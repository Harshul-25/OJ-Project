import express from 'express';
import getProblems from '../controllers/getproblems.js';
const router = express.Router();


// router.post('/upload', upload.single('file'), uploadImage);
router.get('/getAllproblems', getProblems);

export default router;