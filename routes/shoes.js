import express from 'express';

const router = express.Router()

router.get('/all',(req,res)=>{
    res.send("get shoes");
});
router.post('/create',(req,res)=>{
    res.send("Add new shoes");
});
router.put('/update',(req,res)=>{
    res.send("update shoes");
});
router.delete('/delete',(req,res)=>{
    res.send("delete shoes");
});
export default router;