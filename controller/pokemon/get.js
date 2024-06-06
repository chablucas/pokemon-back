const { initDatabase } = require('../../database');

async function getOnePokemon(id){
    let db = await initDatabase();

    if (db){
        console.log({db});
        const results = await db.collection("pokemon").findOne({ _id:(id)});
        return results;
    }
}

module.exports = {getOnePokemon}