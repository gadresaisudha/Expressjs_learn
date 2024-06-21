const aboutController = (req,res)=>{
    const data = {
        name : "Sudha",
        userId: 40,
    };
    res.render('about', data);
   }
   export {aboutController};