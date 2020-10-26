const db = require('../db')();
const COLLECTION="projects";
const LOOK_ISSUES_PIPELINE=[
    {
        $lookup:{
            from:"issues",
            localField:"id",
            foreignField:"projects",
            as: "issues"
        },
    },
];

module.exports = () => {
    
    const get = async(id = null) => {
        console.log ('inside projects model' );
        if (!id){
        const projcets=await db.get(COLLECTION);
        return projcets;
    }
    const projects=await db.get(COLLECTION,{id});
    return projects;
};
    const add = async(name) => {
        const projectsCount=await db.count(COLLECTION);
        const results=await db.add(COLLECTION, {
            id:projectsCount +1,
            name:name,
        });
        return results.result;
    };
    const aggregateWithIssues=async()=> {
        const projcets=await db.aggregate(COLLECTION,LOOK_ISSUES_PIPELINE);
        return projects;
    };
    return {
        get ,
        add,
        aggregateWithIssues,
    };
};