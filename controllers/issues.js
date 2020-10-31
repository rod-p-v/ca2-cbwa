const issues = require ('../models/issues.js')();

module.exports = () => {
   
   const getController = async(req,res) => {
      res.json(await issues.get());
   };
   const populatedController=async(reg,res)=>{
      res.json(await issues.aggregateWithProjects());
   };
   
   const getByissuesNumber = async(req,res)=> {
      res.json(await issues.get(req.params.issuesNumber));
   };

   const postController = async( req , res ) => {
   
      const slug = req.body.slug;
      const title = req.body.title;
      const description=req.body.description;
      const result =await issues.add(slug,title,description);
      res.json(result);
   }
   
   return {
      getController ,
      postController, 
      populatedController,
      getByissuesNumber,
   };
};