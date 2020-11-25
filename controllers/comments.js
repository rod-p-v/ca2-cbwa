const comments = require('../models/comments.js')();


module.exports = () => {
    
    const getController = async(req,res) => {
        const{commentsList,error}=await comments.get()
        if(error){
            return res.status(500).json({error})
        }
        res.json({comments:commentsList});
    };
    
    const populatedController=async(reg,res)=>{
        const{commentsList,error}=await comments.aggregateWithProjects()
        if(error){
            return res.status(500).json({error})
        }
        res.json({comments:commentsList});
    };
    
    const getByAuthor = async(req,res)=> {
        const{commentsList,error}=await comments.get(req.params.author);
        if(error){
            return res.status(500).json({error})
        }
        res.json({comments:commentsList});
    };
    
    const postController = async( req , res ) => {
        const text = req.body.text;
        const author = req.body.author;
        const result =await issues.add(text,author);
        if(error){
            return res.json({error:error})
        }
        res.json({result});
    };
    return { 
        getController ,
        postController, 
        getByAuthor,
        populatedController,
    };
};