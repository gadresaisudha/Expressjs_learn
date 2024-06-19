import express from 'express';
import shoes from './routes/shoes.js';
import students from './routes/students.js';

const app = express();
app.get('/',(req,res)=>{
    res.send("<h1>Welcome to express js</h1>");
});
app.get('/contact',(req,res)=>{
    res.send("contact page");
});
app.get('/x/',(req,res)=>{
    res.send("contact page");
});

app.get('/product/shoes',(req,res)=>{
    res.send("path products/shoes");
});
app.get('/multiplecb',(req,res,next)=>{
    console.log('first');
    next();
},
(req,res)=>{
    res.send("second callback");
}
);

app.get('/multiplecb',(req,res,next)=>{
    console.log('first');
    next();
},
(req,res)=>{
    res.send("second callback");
}
);
/*
app.get('/',(req,res)=>{
    res.send("get shoes");
});
app.post('/products/shoes/create',(req,res)=>{
    res.send("Add new shoes");
});
app.put('/products/shoes/update',(req,res)=>{
    res.send("update shoes");
});
app.delete('/products/shoes/delete',(req,res)=>{
    res.send("delete shoes");
});

*/
/*
app.route("/products/shoes")
.get((req,res)=>{
    res.send("get shoes");
})
.post((req,res)=>{
    res.send("Add new shoes");
})
.put((req,res)=>{
    res.send("update shoes");
})
.delete((req,res)=>{
    res.send("delete shoes");
});
*/
app.use("/products/shoes",shoes);

app.get("/products/shoes/all/:id/:category",(req,res)=>{
  
    const {id,category} = req.params; //make sure to use the same name as in url
    res.send(`id, category : ${id}, ${category}`); 
 });

app.param("id",(req,res,next,id)=>{
    console.log(`${id}`)
    next();  //jump to next function
 })
 app.get('/products/shoes/all/:id',(req,res)=>{
    res.send('good');
 });

 app.use("/students",students);

 app.get("/products",(req,res)=>{
    const {category,id} = req.query; //make sure to use the same name as in url
    res.send(`category,id : ${category}, ${id}`);
}) //http://localhost:8000/products?category=laptop&id=123

app.listen(8000,()=>console.log('server up'));