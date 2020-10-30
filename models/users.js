const db=require("../db")();
const COLLECTION="users";

module.exports=()=>{
    
    const get = async(id = null) => {
        console.log ('inside issues model' );
        if(!id){
            const users=await db.get(COLLECTION);
            return users;
        }
        const users=await db.get(COLLECTION, {id});
        return users;
    };
    const add = async(name,email,usertype,key) => {
        const usersCount=await db.count(COLLECTION);
        const results=await db.add(COLLECTION, {
            id:usersCount+1,
            name: name,
            email:email,
            usertype:usertype,
            key:key,
        });
        return results.result;
    };
    const aggregateWithProjects=async()=>{
        const issues=await db.aggregate(COLLECTION,LOOKUP_PROJECT_PIPELINE);
        return issues;
    };
    const getByKey=async(key)=>{
        if(!key){
            console.log(" 01:Missing key");
            return null;
        }
        const users=await db.get(COLLECTION,{key});
        if (users.length !==1){
            console.log(" 02:Bad key");
            return null;
        }
        return users[0];
    };
    return{
        getByKey,
        get,
        add,
        aggregateWithProjects
    };
};