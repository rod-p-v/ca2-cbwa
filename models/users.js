const db=require("../db")();
const COLLECTION="users";

module.exports=()=>{
    
    const get = async(email = null) => {
        console.log ('inside users model' );
        if(!email){
            try{
                const users=await db.get(COLLECTION);
                console.log(users)
                return {usersResults:users};
            }catch(ex){
                console.log("---USERS GET AN ERROR")
                return{error:ex}
            }
        }
        try{
            const users=await db.get(COLLECTION, {email});
            return {users};
        }catch{
            console.log("---USERS GET AN ERROR")
            return{error:ex}
        }
        
    };
    const add = async(name, email, usertype, key) => {
        if(name != null, email !=null, usertype !=null, key !=null){
            let users;
            try{
                users=await get(email);
            }catch(ex){
                console.log("---NOT ALL THE FIELDS WERE FILLED");
                return { ex:error }
            }
            
            if(users.length ===0){
                try{
                    const results=await db.add(COLLECTION, {
                        id:usersCount+1,
                        name: name,
                        email:email,
                        usertype:usertype,
                        key:key,
                    });
                    return { usersResults: results.result};
                }catch(ex){
                    console.log("---ADD AN USER GET AN ERROR");
                    return{error:ex}
                }
            }
        }
    }
        
        const getByKey=async(key)=>{
            if(!key){
                console.log(" 01:Missing key");
                return null;
            }
            try{
                const users=await db.get(COLLECTION,{key});
                if (users.length !==1){
                    console.log(" 02:Bad key");
                    return null;
                }
                return users[0];
            }catch(ex){
                console.log("Exception users::getByKey")
                return null
            }
        };
        return{
            getByKey,
            get,
            add,
            
        };
    };
   