const db = require("../db")();
const COLLECTION="issues";

const LOOKUP_PROJECT_PIPELINE=[
    {
        $lookup:{
            from:"projects",
            localField:"projects",
            foreignField:"id",
            as:"a",
        },
    },
    {
        $project:{
            id:1,
            name:1,
            projects:{
                $arrayElemAt:["$a",0],
            },
        },
    },
];

module.exports = () => {
    
    const get = async(id = null) => {
    console.log ('inside issues model' );
    if(!id){
        const issues=await db.get(COLLECTION);
    return issues;
    }
    const issues=await db.get(COLLECTION, {id});
    return issues;
};
    const add = async(name,projects) => {
        const issuesCount=await db.count(COLLECTION);
        const results=await db.add(COLLECTION, {
            id:issuesCount+1,
            name: name,
            projects: projects
    });
    return results.result;
    };
    const aggregateWithProjects=async()=>{
        const issues=await db.aggregate(COLLECTION,LOOKUP_PROJECT_PIPELINE);
        return issues;
    };
    return {
    get ,
    add,
    aggregateWithProjects,
    };
    };