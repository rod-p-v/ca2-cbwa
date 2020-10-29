const users = require ('../models/users.js')();

module.exports = () => {
   
   const getController = async(req,res) => {
      res.json(await users.get());
   };
   const populatedController=async(reg,res)=>{
      res.json(await users.aggregateWithProjects());
   };
   
   const getById = async(req,res)=> {
      res.json(await users.get(parseInt(req.params.id)));
   };
   const postController = async( req , res ) => {
      const name = req.body.name;
      const projects = req.body.projects;
      const result =await users.add(name,projects);
      res.json(result);
   }
   
   return {
      getController ,
      postController, 
      getById,
      populatedController,
   };
};