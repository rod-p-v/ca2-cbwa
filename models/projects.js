const db = require('../db.js')();
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
    
    const get = async(slug = null) => {
        console.log ('inside projects model' );
        if (!slug){
            const projects=await db.get(COLLECTION);
            console.log(projects);
            return projects;
        }
        const projects=await db.get(COLLECTION,{slug});
        return projects;
    };
    const add = async(slug,name,description) => {
        const projectsCount=await db.count(COLLECTION);
        const results=await db.add(COLLECTION, {
            id:projectsCount +1,
            slug:slug,
            name:name,
            description:description,
        });
        return results.result;
    };
    const aggregateWithIssues=async()=> {
        const projects=await db.aggregate(COLLECTION,LOOK_ISSUES_PIPELINE);
        return projects;
    };
    return {
        get ,
        add,
        aggregateWithIssues,
    };
};