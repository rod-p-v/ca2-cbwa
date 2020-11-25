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

const LOOK_COMMENTS_PIPELINE=[
    {
        $lookup:{
            from:"comments",
            localField:"id",
            foreignField:"issues",
            as: "comments"
        },
    },
];

module.exports = () => {
    
    const get = async(issuesNumber = null) => {
        console.log ('inside issues model' );
        if(!issuesNumber){
            try{
                const issues=await db.get(COLLECTION);
                console.log(issues)
                return {issuesList:issues};
            }catch(ex){
                console.log("---ISSUES GET ERROR")
                return{error:ex}
            }
        };
        
        try{
            const issues=await db.get(COLLECTION, {issuesNumber});
            return {issuesList};
            // return {issuesList:issues};
        }catch(ex){
            console.log("---ISSUES GET AN ERROR")
            return{error:ex}
        }
    };
    const add = async(slug,title,description) => {
        if(slug != null,title != null,description != null){
            let issues;
            try{
                issues=await get(issuesNumber);
            }catch(ex){
                console.log("---NOT ALL THE FIELDS WERE FILLED ")
                return{ex}
            }
            
            if(issues.lenght ===0){
                try{
                    const issuesCount=await db.count(COLLECTION);
                    const results=await db.add(COLLECTION, {            
                        id:issuesCount+1,
                        issuesNumber:slug+"-"+(issuesCount+1),
                        slug:slug,
                        title: title,
                        description: description,
                    });
                    return {issuesList:results.result};
                }catch(ex){
                    console.log("---ADD AN USER GET AN ERROR")
                    return{error:ex}
                }
            }
        }
    }
    const aggregateWithProjects=async()=>{
        try{
            const issuesList=await db.aggregate(COLLECTION,{LOOKUP_PROJECTS_PIPELINE});
            return {issuesList:issues};
        }catch(ex){
            return{error:ex}
        }
    };
    const aggregateWithComments=async()=>{
        try{
            const issuesList=await db.aggregate(COLLECTION,{LOOKUP_COMMENTS_PIPELINE});
            return {issuesList:issues};
        }catch(ex){
            return{error:ex} 
        }      
    };
    return {
        get ,
        add,
        aggregateWithComments,
        aggregateWithProjects,
    };
};