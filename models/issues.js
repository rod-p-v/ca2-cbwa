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
    const add = async(slug,title,description,issuesNumber,) => {
        //let projectsName="";
        const issuesCount=await db.count(COLLECTION);
        const results=await db.add(COLLECTION, {            
            slug:slug,
            title: title,
            description: description,
            id:issuesCount+1,
            issuesNumber:slug+"-"+(issuesCount+1)
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