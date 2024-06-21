ExpressJs :
Fast, unopinionated, minimalist
web framework for Node.Js

Why ?
1.useful for creating webapplications
as it minimal nodejs webapplication framework 
that provides set of features for both web and mobile development
2.allows us to create apis
3. super fast
4. many popular frameworks are based on Express

Steps to install ExpressJs
mkdir Exp
cd Exp
npm init -y (update package.json)
npm install express

.gitignore -> place all files that you dont want to upload to git


To create express app we need to import it first
import express from 'express'
Then create instance of express
const app = express()
The above line will allows us to create server and all other work
Then we need to listen to that server on port
app.listen(8000,()=>console.log('server up'))

we use nodemon so that we dont have to 
stop and start the server again and again
To install nodemon
npm i nodemon
then in package.json change scripts to  "dev" : "nodemon index.js"
so that on terminal we can use npm run dev

Basic Routing:
To send response to browser
app.get('/',(req,res)=>{
    res.send("Welcome to express js");
});
Above when user hits the path provided in first params
then call back function is called from second params
and the user hits are also based on different http methods
get,put,delete,post ...

Advance Routing:
string pattern path
app.get('/contact',(req,res)=>{
    res.send("contact page");
});
Regex : use regex for pattern path
app.get('/x/',(req,res)=>{
    res.send("contact page");
});
Nested routes:
app.get('/products/shoes',(req,res)=>{
    res.send("path products/shoes");
});
we can provide either single callback function
or multiple callbacks
app.get('/multiplecb',(req,res,next)=>{
    console.log('first')
    next();
},
(req,res)=>{
    res.send("second callback");
},
);//will display only firstcallback
use next() function to call next callback
can only have one response
for array of callback function declare in variable and use next
app.get("/arraycb",[cb1,cb2,cb3]);
http methods:
GET : Retrieve Data
Post : Create/Insert Data
Put : completely update Data
Patch : partially update Data
Delete : delete Data
All : any http request
app.get('/products/shoes',(req,res)=>{
    res.send("get shoes");
});
app.post('/products/shoes',(req,res)=>{
    res.send("Add new shoes");
});
app.put('/products/shoes',(req,res)=>{
    res.send("update shoes");
});
app.delete('/products/shoes',(req,res)=>{
    res.send("delete shoes");
});

Route method:
There is a lot of duplication above so route method 
helps in refactoring our cour code into single line
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
Inorder to test other http methods other than get use postman
login your account give that path and apply http method

Router method:
The above approach is fine but to make the code more refactored
and more precise we use Router method
steps for using this method:
1. create routes folder and put your routes in seperate file
2. Create instance of express.Router()
3. Instead of app.method change that to router.method
4. Export router
5. Import router
6. Use the app.use built in middleware & provide routes
Following the above steps
First created a folder routes and inside that shoes.js file
In shoes.js->import express and create instance of express.Router()
In router method just give the path that is specified 
to specific method the main path will be specified using app.use 
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
now export them
export default router
Import it to index.js
app.use("/products/shoes",sudha);
This method acts as middlewear for all the routes and then based on specific
path specific http methods are called
Test all the methods using postman
 
 Route Params:
 capture the data from the url -> use :id in url
 it can be retrieved using req.params.id

 app.get('/shoes/all/:id',(req,res)=>{
    res.send(req.params.id);
 });
 while test use
 localhost:8000/shoes/all/123
 In order to write the specific function for the 
 specified params use this method
 app.param("id",(req,res,next,id)=>{
    console.log(`${id}`)
    next();  //jump to next function
 })
 app.get('/shoes/all/:id',(req,res)=>{
    res.send('ood');
 });

Controllers:
Nothing but seperate File where we write logic for our 
callback function that get called based on path
First create a file students.js inside routes folder
create a folder Controllers
then create a file student.js
import express
store callback functions in variables
const allstudents = (req,res)=>{
    res.send("get students");
};
export all these variables that have callback functions
export {allstudents,updatestudent,createstudent,deletestudent};
Now inside students.js file
import express, create router instance and then create all http methods
also import the callbackfunction variables from the Controllers
assign these variables to http method instead of callback functions
Now import the student.js routes file into our main file index.js
import students from './routes/students.js';
In index.js make use of method
app.use("/students",students)
This above line here acts as middleware
which calls routes folder which internally calls Controllers folder
Test all methods from postman

Query string:
Query string is the data that is present in the url
that follows after ? 
It can have set of key,values seperated by &
where each key is seperated by = signs
This used when we want to send data from
client to server
app.get("/products",(req,res)=>{
    res.send(`category val : ${req.query.category}`)
})
when you hit the localhost with
http://localhost:8000/products?category=laptop
display response as category val : laptop
can capture multiple values seperated by &
//http://localhost:8000/products?category=laptop&id=123
This is how you send data from frontend to backend

Sending Json:
This is how you send data from backend to frontend
create a file product.js
It has variable that stores json data
export it
import it on index.js
res.json(products) //to send data to browser

middleware:
middleware is a function that gets implemented between
the path request and response callback function
It has access to the req and res objects
it can mosify the request or the response or use next 
to go to next middleware function
used to add functionality for the server application
like for userlogin,authenticate user or authorize user
log back something
request ---> middleware(for login check)
       response <-----
middleware function is as follows:
function usercredentials(req,res,next){
    console.log("username:Sudha");
    console.log("password:12345");
}
use that function in your get method
app.get("/product/laptops",usercredentials,(req,res)=>{
    res.json(products);
})
more better method:
create a folder middleware and create file usercheck.js
store your middleware function in this export it
function usercredentials(req,res,next){
    console.log("username:Sudha");
    console.log("password:12345");
    next();
}
export default usercredentials;
Import it into your index.js
import usercheck from './middleware/usercheck.js';
app.get("/product/mobiles",usercheck,(req,res)=>{
    res.json(products);
})
better method:
In order to apply your middleware function
to all the following http methods make use of 
app.use() method
implementation:
app.use(usercheck)
app.get("/product/mobiles/About",(req,res)=>{
    res.json(products);
})
app.get("/product/mobiles/contact",(req,res)=>{
    res.json(products);
})
In console you can see usercredentials applied to 
all the following methods
also can provide route to the app.use
app.use("/apple",usercheck);

Serving static files in express:
for that first create a public folder and create .html and .js files
Put your html content and associated .js content in respective file
Now in main index.js file inorder to server our static files
use the following code
app.use(express.static('./public'));
app.get('/servingstatic',(req,res)=>{
    res.sendFile(path.join(process.cwd(),'./public/index.html'));
})
By the above code we have served out index.htmlfrom public folder and associated files
so using path.join we join cuurrent working directory and the file where there is 
html content to display
next using sendFile method we send the our localhost to that path

Template Engine:
A template engine enables you to use static template files in your application
what is EJS -> Embedded Javascript
To install EJS
>>>>npm install ejs
In the main index.js file:
Inorder to let know expressJs that we are using EJS use the following code:
app.set('view engine','ejs')
Create Controllers folder and homeController.js file to define the callback function for routes
const homeController = (req,res)=>{
 res.render('home'); //name of ejs file
}
export {homeController};
here render method is used to render the EJS file
For the EJS files create new folder views
home.ejs and give normal html content
now our contoller and appropriate page to deliver is set
now we have to mention the contoller in routes.js
Now create a routes folder and route.js file to redirect the paths
import express from 'express';
import {homeController} from '../controllers/homeController.js';
import {aboutController} from '../controllers/aboutController.js';
const router = express.Router();
router.get('/Home',homeController)
router.get('/about',aboutController)
export default router;
Now use the default router in out main index.js
app.set('view engine','ejs');
app.use('/',router);
Summary : main index.js set that it uses ejs and give the use method for all routes
          In routes.js file provide http method,path and controllers
          In contoller you have your callback function where  you use render which means
          render ejs files

EJS crash course:
follow above steps and create the same template for about.ejs
In order to display a variable on our about.ejs file
first we need to send it from contoller:
in contoller make the following changes:
const aboutController = (req,res)=>{
    const data = {
        name : "Sudha",
    };
    res.render('about', data);
}
export {aboutController};
Now in about.ejs file use <%= %> // for dynamic content
<body>
  <%= name %>
  <%= name.toUppercase() %>
  2+2 = <%= 2+2 %>
  <h1>About from EJS </h1>
</body>
conditional statement:
update contoller to send userId
<% if(userId===20){ %>
    <h1>User Id <%=userId%></h1>
  <%} else if(userId===30){%>
    <h2>User Id <%=userId%></h2>
    <%}else {%>
      <h1>Nothing</h1>
    <%}%>
For loops:
 <% for (let i = 0;i<3;i++) { %>
    <h1><%=i%></h1>
    <% } %> 
    <%const data = [1,2,3,4,5] %> 
   <% for (const key in data) { %> 
    <h1><%=key %></h1>
    <% } %> 


If we want to send JSON data via post method through postman
and want to get the data from req.body
we need to have body-parser
import that module 'body-parser'
and use the following code
app.use(bodyParser.json())