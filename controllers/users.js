const users = require ('../models/users.js')();

module.exports = () => {
   
   const getController = async(req,res) => {
      const{usersResults,error}=await users.get();
      if(error){
         return res.status(500).json({error});
      }
      res.json({users:usersResults});
   };
   const populatedController=async(reg,res)=>{
      const{usersResults,error}=await users.aggregateWithProjects();
      if(error){
         return res.status(500).json({error});
      }
      res.json({users:usersResults});
   };
   
   const getByEmail = async(req,res)=> {
      const{usersResults,error}=await users.get(req.params.email);
      if(error){
         return res.status(500).json({error});
      }
      res.json({users:usersResults});
   };
   
   
   const postController = async( req , res ) => {
      const name = req.body.name;
      const email=req.body.email;
      const usertype=req.body.usertype;
      const key = req.body.key;      
      const {result, error} =await users.add(name, email, usertype, key);
      console.log(result, error)
     if(error){
         return res.json({error: error})
      }
      res.json({result});
   };
   
   
   return {
      getController ,
      postController, 
      getByEmail,
      populatedController,
   };
};