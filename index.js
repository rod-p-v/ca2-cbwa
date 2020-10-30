const express = require('express');
const bodyParser = require ('body-parser');


const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;

const projectsController = require ( './controllers/projects' )();
const issuesController = require ( './controllers/issues' )();
const usersController = require('./controllers/users' )();

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
    
    if(!suppliedKey) {
        console.log("  [%s] FAILED AUTHENTICATION -- %s,No Key Supplied",new Date(), clientIp);
        
        FailedAuthMessage.code="01";
        return res.status(401).json(FailedAuthMessage);
    }
    const user=await users.getByKey(suppliedKey);
    if (!user) {
        console.log(
            " [%s] FAILED AUTHENTICATION -- %s,BAD Key Supplied", new Date(), clientIp);
            FailedAuthMessage.code="02";
            return res.status(401).json(FailedAuthMessage);
        }
        next();
    });
    app.use(bodyParser.json());
    
    
    //Get all issues
    app.get ('/issues',issuesController.getController);
    //Get all issues acording the project
    app.get("/issues/populated",issuesController.populatedController);
    //Add a issues
    app.post ('/issues',issuesController.postController);
    //A issues
    app.get('/issues/:id',issuesController.getById);

    //app.get('/issues/:issuesNumber',issuesController.getByissuesNumber);
    
    //Get all projects
    app.get('/projects',projectsController.getController);
    //Get all projects with issues
    app.get("/projects/populated",projectsController.populatedController);
    //Add all projects
    app.post ('/projects',projectsController.postController );
    //A projects
    app.get('/projects/:id',projectsController.getById);
    
    //Get all users
    app.get ('/users',usersController.getController);
    //Get all users acording the project
    app.get("/users/populated",usersController.populatedController);
    //Add a users
    app.post ('/users',usersController.postController);
    //A users
    //app.get('/users/:email',usersController.getByEmail);
    
    /*app.get('comments',commentsController.getController);
    //Get all projects with issues
    app.get("comments/populated",commentsController.populatedController);
    //Add all projects
    app.post ('comments',commentsController.postController );
    //A projects
    app.get('comments/:id',commentsController.getById);*/
    
    //let COUNT = 0;
    app.get("/", (req,res) =>{
        
        res.json({
            hello:"Welcome 2",  
            //count: COUNT++
        });
    });
    
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