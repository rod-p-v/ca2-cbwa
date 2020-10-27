const express = require('express');
const bodyParser = require ('body-parser');
const { Code } = require('mongodb');
const issues = require('./models/issues');
const projects = require('./models/projects');

const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;

const projectsController = require ( './controllers/projects' )();
const issuesController = require ( './controllers/issues' )();

const users=require("./models/users")();
const app = module.exports = express();
//logging
app.use (( req , res , next ) => {
    // Display log for requests
    console . log ( '[%s] %s -- %s' , new Date(), req.method, req.url );
    next();
});

app.use(async (req,res,next)=>{
    const FailedAuthMessage={
        error:"Failed Authentication",
        message:"You aren't an authorized user",
        code:"401",
};

const suppliedKey=req.headers["x-api-key"];
const clientIp=req.headers["x-forwarded-for"] || req.connection.remoteAddress;

if(!suppliedKey){
    console.log(
        "  [%s] FAILED AUTHENTICATION -- %s,No Key Supplied",
        new Date(),
        clientIp
    );
    FailedAuthMessage.code="01";
    return res.status(401).json(FailedAuthMessage);
}

const user=await users.getByKey(suppliedKey);
if (!user){
    console.log(
        " [%s] FAILED AUTHENTICATION -- %s,BAD Key Supplied",
        new Date(),
        clientIp
    );
    FailedAuthMessage.code="02";
    return res.status(401).json(FailedAuthMessage);
}
next();
});
app.use(bodyParser.json());

app.get("/", (req,res)=>{
    res.json({
      hello:"Welcome",  
    });
});
//Get all projects
app.get ('/issues',issuesController.getController);
//Get all issues acording the project
app.get("issues/populated",issuesController.populatedController);
//Add a projects
app.post ('/issues',issuesController.postController);
//A projects
app.get('/issues/:id',issuesController.getById);

//Get all users
app.get ('/projects',projectsController.getController);
//Get all projects with issues
app.get("/projects/populated",projectsController.populatedController);
//Add all users
app.post ('/projects',projectsController.postController );
//A users
app.get('/projects/:id',projectsController.getById);


app.listen ( port , hostname, () => {
    console.log ( `Server running at http:// ${hostname}:${port}/`);
    });
    // 404
    app.use((req,res) => {
    res.status(404).json ({
    error: 404 ,
    message: 'Route not found',
    });
});



//como push a git hub: git push -u origin main