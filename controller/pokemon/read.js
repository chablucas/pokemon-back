const { initDatabase } = require('../../database');

async function getAllPokemon(){
    let db = await initDatabase();

    if (db){
        console.log({db});
        const results = await db.collection("pokemon").find({}).toArray()
        return results;
    }
}

module.exports = {getAllPokemon}