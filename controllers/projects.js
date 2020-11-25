const projects=require ("../models/projects.js") ();

module.exports = () => {
    
    const getController = async( req , res ) => {
        const{projectsList,error}=await projects.get();
        if(error){
            return res.status(500).json({error})
        }
        res.json({projects:projectsList});
    };
    
    const populatedController = async (reg,res)=>{
        const{projectsList,error}= await projects.aggregateWithIssues()
        if(error){
            return res.status(500).json({error})
        }
        res.json({projects:projectsList});
    }
    
    const getBySlug = async(req,res)=> {
        const{projectsList,error}=await projects.get(req.params.slug);
        if(error){
            return res.status(500).json({error})
        }
        res.json({projects:projectsList});
    }
    
    const postController = async( req , res ) => {        
        const slug = req.body.slug;
        const name = req.body.name;
        const description = req.body.description;
        const result = await projects.add(name,slug,description);
        if(error){
            return res.status(500).json({error})
        }
        res.json({result});
    };
    return {
        getController ,
        postController,
        getBySlug,
        populatedController,
    };
};