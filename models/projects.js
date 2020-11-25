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
            try{
                const projects=await db.get(COLLECTION);
                console.log(projects);
                return {projectList:projects};
            }catch(ex){
                console.log("----PROJECTS GET ERROR")
                return{error:ex}
            }
        }
        try{
            const projects=await db.get(COLLECTION,{slug});
            return {projects};
        }catch{
            console.log("---PROJECTS GET AN ERROR")
            return{error:ex}  
        }
    };
    
    const add = async(slug,name,description) => {
        if(slug != null,name != null,description != null){
            let projects;
            try{
                projects=await get(slug);
            }catch(ex){
                console.log("---NOT ALL THE FIELDS WERE FILLED")
                return{ex}
            }
            
            if(projects.length ===0){
                try{
                    const results=await db.add(COLLECTION, {
                        id:projectsCount +1,
                        slug:slug,
                        name:name,
                        description:description,
                    });
                    return {projectList:results.result};
                }catch(ex){
                    console.log("---ADD A NEW PROJECT GET AN ERROR")
                    return{error:ex}
                }
            }
        }
    }
    const aggregateWithIssues=async()=> {
        try{
            const projects=await db.aggregate(COLLECTION,{LOOK_ISSUES_PIPELINE});
            return {projectList:projects};
        }catch(ex){
            return{error:ex}  
        }
    };
    
    return {
        get ,
        add,
        aggregateWithIssues,
    };
};