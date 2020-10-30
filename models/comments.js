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
    const add = async(name,projects) => {
        const commentsCount=await db.count(COLLECTION);
        const results=await db.add(COLLECTION, {
            id:commentsCount+1,
            name: name,
            issues: issues
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