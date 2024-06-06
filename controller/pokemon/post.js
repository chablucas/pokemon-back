const { initDatabase } = require('../../database');

async function SavePokemon(pokemonData){
    let db = await initDatabase();

    if (db){
        console.log({db});
        const results = await db.collection("pokemon").insertOne(pokemonData);
        return results;
    }
}

module.exports = {SavePokemon};