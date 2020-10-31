const { text } = require("body-parser");

const db = require("../db")();
const COLLECTION="issues/comments";

const LOOKUP_PROJECT_PIPELINE=[
    {
        $lookup:{
            from:"issues",
            localField:"issues",
            foreignField:"id",
            as:"a",
        },
    },
    {
        $issues:{
            id:1,
            name:1,
            issues:{
                $arrayElemAt:["$a",0],
            },
        },
    },
];

module.exports = () => {
    
    const get = async(id = null) => {
        console.log ('inside comments model' );
        if(!id){
            const comments=await db.get(COLLECTION);
            return comments;
        }
        const comments=await db.get(COLLECTION, {id});
        return comments;
    };
    const add = async(text,author) => {
        const commentsCount=await db.count(COLLECTION);
        const results=await db.add(COLLECTION, {
            id:commentsCount+1,
            text:text,
            author:author
        });
        return results.result;
    };
    const aggregateWithProjects=async()=>{
        const comments=await db.aggregate(COLLECTION,LOOKUP_PROJECT_PIPELINE);
        return comments;
    };
    return {
        get ,
        add,
        aggregateWithProjects,
    };
};