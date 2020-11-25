const { text } = require("body-parser");
const comments = require("../controllers/comments");

const db = require("../db")();
const COLLECTION="comments";

const LOOKUP_ISSUES_PIPELINE=[
    {
        $lookup:{
            from:"issues",
            localField:"issues",
            foreignField:"id",
            as:"a",
        },
    },
    {
        $project:{
            id:1,
            name:1,
            issues:{
                $arrayElemAt:["$a",0],
            },
        },
    },
];

module.exports = () => {
    
    const get = async(author = null) => {
        console.log ('inside comments model' );
        if (!author){
            try{
                const comments=await db.get(COLLECTION);
                console.log(comments);
                return {commentsList:comments};
            }catch(ex){
                console.log("----COMMENTS GET ERROR")
                return{error:ex}
            }
        }
        try{
            const comments=await db.get(COLLECTION,{author});
            return {comments};
        }catch{
            console.log("---COMMENTS GET AN ERROR")
            return{error:ex}  
        }
    };
    
    const add = async(text,author) => {
        if(text != null,author !=null){
            let comments;
            try{
                comments=await get(author);
            }catch(ex){
                console.log("NOT ALL THE FIELDS WERE FILLED")
                return{error:ex}
            }
            
            if(comments.length ===0){
                try{
                    const results=await db.add(COLLECTION, {
                        id:commentsCount+1,
                        text:text,
                        author:author
                    });
                    return {commentsList:results.result};
                }catch(ex){
                    console.log("---ADD A NEW COMMENT GOT AN ERROR")
                    return{error:ex}
                }
            }
        }
    }
    const aggregateWithIssues=async()=>{
        try{
            const comments=await db.aggregate(COLLECTION,{LOOKUP_ISSUES_PIPELINE});
            return {commentsList:comments};
        }catch{
            return{error:ex}
        }
    };
    return {
        get ,
        add,
        aggregateWithIssues,
    };
};