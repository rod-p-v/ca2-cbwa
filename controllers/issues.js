const issues = require ('../models/issues.js')();

module.exports = () => {

const getController = async(req,res) => {
res.json(await issues.get());
};
const populatedController=async(reg,res)=>{
   res.json(await issues.aggregateWithProjects());
};

const getById = async(req,res)=> {
   res.json(await issues.get(parseInt(req.params.id)));
};
const postController = async( req , res ) => {
const name = req.body.name;
const projects = req.body.projects;
const result =await issues.add(name,projects);
res.json(result);
}

return {
getController ,
postController, 
getById,
populatedController,
};
};