const projects = require ('../models/projects.js')();

module.exports = () => {

const getController = (req,res) => {
    res.setHeader ( 'Content-Type' , 'application/json' );
return  res.json(projects.get());
}

const getById = (req,res)=> {
    res.setHeader('Content-Type','application/json')
    res.json(projects.get(req.params.id));
}
const postController = ( req , res ) => {
const name = req.body.name;
const projects = req.body.projects;
projects.add(name,projects);
return res.end(`POST: ${ name } `)
}

return {
getController ,
postController, 
getById
}
}