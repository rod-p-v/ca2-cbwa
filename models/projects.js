const db = require("../db")();

module.exports = () => {
    
    const get = (id = null) => {
    console.log ('inside books model' );
    if(!id){
    return db.projects;
    }
    return db.projects[parseInt(id) -1];
}
    const add = (name,projects) => {
    return db.projects.push ({
        id: db.projects.length +1,
        name: name,
        author: author
    });
    }
    return {
    get ,
    add
    }
    };