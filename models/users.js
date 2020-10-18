const db = require('../db')();

module.exports = () => {
    
    const get = (id = null) => {
        console.log ('inside authors model' );
        if(!id){
        return db.users;
        }
        return db.users[parseInt(id) -1];
    }
    const add = (name) => {
        return db.users.push({
            id: db.users.length +1,
            name,
        });
    }
    return {
        get ,
        add
    }
};