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

   const getByissuesNumber = async(req,res)=> {
      res.json(await issues.get(parseInt(req.params.id)));
   };

   const postController = async( req , res ) => {
      //const projectsName=projectsName;
      //const issuesNumber=req.body.issuesNumber;
      const slug = req.body.slug;
      const title = req.body.title;
      const description=req.body.description;
      const result =await issues.add(slug,title,description);
      res.json(result);
   }
   
   return {
      getController ,
      postController, 
      getById,
      populatedController,
      getByissuesNumber,
   };
};