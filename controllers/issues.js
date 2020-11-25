const issues = require ('../models/issues.js')();

module.exports = () => {
   
   const getController = async(req,res) => {
      const{issuesList,error}=await issues.get();
      if(error){
         return res.status(500).json({error})
      }
      res.json({issues:issuesList});
   };
   const populatedController=async(reg,res)=>{
      const{issuesList,error}=await issues.aggregateWithProjects();
      if(error){
         return res.status(500).json({error})
      }
      res.json({issues:issuesList});
   };
   
   const getByissuesNumber = async(req,res)=> {
      const{issuesList,error}=await issues.get(req.params.issuesNumber);
      if(error){
         return res.status(500).json({error})
      }
      res.json({issues:issuesList});
   };
   
   const postController = async( req , res ) => {
      
      const slug = req.body.slug;
      const title = req.body.title;
      const description=req.body.description;
      const result=await issues.add(slug,title,description);
      if(error){
         return ({error:ex})
      }
      res.json({result});
      
   };
   
   return {
      getController ,
      postController, 
      populatedController,
      getByissuesNumber,
   };
};