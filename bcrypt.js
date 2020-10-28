const { hash } = require("bcrypt")

const myPassword="test1"
const bcrypt=require(

bcrypt.hash(myPassword,11, (err,hash) =>{
    if(err){
        console.log('ERROR')
        console.log(err)
    }
    console.log(hash)
}))