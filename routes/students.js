import express from 'express';
import {allstudents,updatestudent,createstudent,deletestudent} from '../controllers/student.js';


const router = express.Router()

router.get('/all',allstudents);
router.post('/create',createstudent);
router.put('/update',updatestudent);
router.delete('/delete',deletestudent);
export default router;