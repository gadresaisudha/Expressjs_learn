import express from 'express';


const allstudents = (req,res)=>{
    res.send("get students");
};
const createstudent =(req,res)=>{
    res.send("Add new student");
};
const updatestudent = (req,res)=>{
    res.send("update student");
};
const deletestudent = (req,res)=>{
    res.send("delete student");
};

export {allstudents,updatestudent,createstudent,deletestudent};