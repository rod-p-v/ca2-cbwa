const express = require('express');
const bodyParser = require ('body-parser');


const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;

const projectsController = require ( './controllers/projects' )();
const issuesController = require ( './controllers/issues' )();
const usersController = require('./controllers/users' )();
const commentsController = require('./controllers/comments')();


const users=require("./models/users")();
const app = module.exports = express();

app.use (( req , res , next ) => {

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
    
    const path=require('path');
    app.set('views',path.join(__dirname,'views'));
    app.set('view engine','hbs');
    
    const ISSUES=require('./models/issues')();
    app.get("/",async(req,res)=>{
        const {issuesList}=await ISSUES.get();

        console.log(issuesList);
        res.render('index',{
            title:"Bugs tracker",
            heading:"Welcome to our bugs tracker",
            text:"List with all the current bugs in our system",
            issues:issuesList
        });
    });
    
    
    
    
    app.get ('/issues',issuesController.getController);
    
    app.get("/issues/populated",issuesController.populatedController);
    
    app.post ('/issues',issuesController.postController);
    
    app.get('/issues/:issuesNumber',issuesController.getByissuesNumber);
    
    
    app.get('/projects',projectsController.getController);
    
    app.get("/projects/populated",projectsController.populatedController);
    
    app.post ('/projects',projectsController.postController );
    
    app.get('/projects/:slug',projectsController.getBySlug);
    
    
    app.get ('/users',usersController.getController);
    
    app.get("/users/populated",usersController.populatedController);
    
    app.post ('/users',usersController.postController);
    
    app.get('/users/:email',usersController.getByEmail);
    
    
    app.get('/comments',commentsController.getController);
    
    app.get("/comments/populated",commentsController.populatedController);
    
    app.post ('/comments',commentsController.postController );
    
    app.get('/comments/:author',commentsController.getByAuthor);
    
    app.use(express.static('style'));

    app.listen ( port , hostname, () => {
        console.log ( `Server running at http:// ${hostname}:${port}/`);
    });
    
    app.use((req,res) => {
        res.status(404).json ({
            error: 404 ,
            message: 'Route not found',
        });
    });
