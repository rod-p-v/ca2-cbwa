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
      const text = req.body.text;
      const author = req.body.author;
      const result =await issues.add(text,author);
      res.json(result);
   }
   
   return {
      getController ,
      postController, 
      getById,
      populatedController,
   };
};