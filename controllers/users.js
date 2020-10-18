const users = require ( '../models/users.js' )();

module.exports = () => {

const getController = ( req , res ) => {
    res.setHeader ( 'Content-Type' , 'application/json' );
    res.json( users.get());
}

const getById = (req,res)=> {
    res.setHeader('Content-Type','application/json')
    res.json(users.get(req.params.id));
}

const postController = ( req , res ) => {
    const name = req.body.name;
    users.add(name);
    return res.end ( `POST: ${ users.name } ` );
}

return {
getController ,
postController,
getById
 }
}