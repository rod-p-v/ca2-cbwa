const comments = require('../models/issues/comments.js');


module.exports = () => {
   
   const getController = async(req,res) => {
      res.json(await comments.get());
   };
   const populatedController=async(reg,res)=>{
      res.json(await comments.aggregateWithProjects());
   };
   
   const getById = async(req,res)=> {
      res.json(await comments.get(parseInt(req.params.id)));
   };
   const postController = async( req , res ) => {
      const name = req.body.name;
      const issues = req.body.issues;
      const result =await issues.add(name,issues);
      res.json(result);
   }
   
   return {
      getController ,
      postController, 
      getById,
      populatedController,
   };
};