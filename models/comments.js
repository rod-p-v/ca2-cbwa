const { text } = require("body-parser");

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
        if(!author){
            const comments=await db.get(COLLECTION);
            return comments;
        }
        const comments=await db.get(COLLECTION, {author});
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
    const aggregateWithIssues=async()=>{
        const comments=await db.aggregate(COLLECTION,LOOKUP_ISSUES_PIPELINE);
        return comments;
    };
    return {
        get ,
        add,
        aggregateWithIssues,
    };
};