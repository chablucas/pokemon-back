const {getAllPokemon} = require('./controller/pokemon/read')
const {getOnePokemon} = require('./controller/pokemon/get')
const {SavePokemon} = require('./controller/pokemon/post')
const express = require('express');
const fs = require('fs/promises');
const cors = require('cors')
require("dotenv").config();


const app = express()
app.use(cors())

let path = "./data/pokemon-data.json"


//MondoDB


app.post('/addpokemon', async (req, res) => {
    try {
        let pokemonData = req.body;

        console.log('Inserting Pokemon:', pokemonData);

        await SavePokemon(pokemonData);

        let pokemon = await SavePokemon();

        if (pokemon.length > 0) {
            res.status(201).send(pokemon);
        } else {
            res.status(404).send({ message: "No Pokémon found" });
        }
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).send({ message: "Error processing request", error: error.message });
    }
});


app.get('/allpokemon', async function (req, res) {

    let pokemon = await getAllPokemon();

    res.send(pokemon);

})


app.get('/onepokemon/:id', async function (req, res) {
    try {
        let onePoke = req.params.id;
        console.log(onePoke);

        let pokemon = await getOnePokemon(onePoke);
        
        if (pokemon) {
            res.send(pokemon);
        } else {
            res.status(404).send({ message: "Pokemon not found" });
        }
    } catch (error) {
        console.error("Error fetching Pokemon:", error);
        res.status(500).send({ message: "Error fetching Pokemon", error: error.message });
    }
});

app.post('/addPokemon', async function (req, res) {
    try {
        const newPokemon = req.body; 
        await savePokemon(newPokemon); 
        res.status(201).send({ message: "Pokemon added successfully" });
    } catch (error) {
        console.error("Error adding Pokemon:", error);
        res.status(500).send({ message: "Error adding Pokemon", error: error.message });
    }
});

//Mongo DB



app.get("/", (request, response) => {
    console.log("Quelqu'un s'est connecté");
    response.send("(; Bienveue sur mon API ;)")
})

app.get('/random', function (req, res) {
  fs.readFile(path)
    .then((data) => {
      // Do something with the data
      let fileData = JSON.parse(data);

      let randomInt = Math.floor(Math.random() * fileData.length);

      let randomPokemon = fileData[randomInt];

      res.send(randomPokemon);

    })
    .catch((error) => {
      // Do something if error 
    });
})


app.get("/random/:catArticle", function (req, res) {
    fs.readFile(path)
        .then((data) => {
            console.log(req.params.catArticle);

            let fileData = JSON.parse(data);

            console.log({fileData})

            let fileDataTier = fileData.filter((item) => {
                console.log(item)
                return item['Types'].includes(req.params.catArticle)
            });

            console.log({fileDataTier});

            let randomIntTier = Math.floor(Math.random() * fileDataTier.length);

            console.log(randomIntTier);

            let randomPokemonTier = fileDataTier[randomIntTier];

            res.send(randomPokemonTier);
        })
        .catch((error) => {
            // Do something if error 
        });
})

app.get("/random/stage/:catArticle2", function (req, res) {
    fs.readFile(path)
        .then((data) => {
            console.log(req.params.catArticle2);

            let fileData = JSON.parse(data);

            console.log({fileData})

            let fileDataTier = fileData.filter((item) => {
                console.log(item)
                return item['Next Evolution(s)'].includes(req.params.catArticle2)
            });

            console.log({fileDataTier});

            let randomIntTier = Math.floor(Math.random() * fileDataTier.length);

            console.log(randomIntTier);

            let randomPokemonTier = fileDataTier[randomIntTier];

            res.send(randomPokemonTier);
        })
        .catch((error) => {
            // Do something if error 
        });
})

app.get("/random/tier/:catArticle3", function (req, res) {
    fs.readFile(path)
        .then((data) => {
            let fileData = JSON.parse(data);

            let nouveauTableau = [];

            fileData.forEach(({ path: { Tier } }) => {
                nouveauTableau.push(Tier);
            });

            let fileDataTier = nouveauTableau.filter((item) => {
                return item.includes(req.params.catArticle3);
            });

            let randomIntTier = Math.floor(Math.random() * fileDataTier.length);

            let randomPokemonTier = fileDataTier[randomIntTier];

            res.send(randomPokemonTier);
        })
        .catch((error) => {
            // Handle errors appropriately, e.g., send a 500 internal server error response
            res.status(500).send("Internal Server Error");
        });
})

app.get("/liste/type", function (req, res) {
    fs.readFile(path)
        .then((data) => {
            let fileData = JSON.parse(data);

            const requestedTypes = req.query.types;
      
            let fileDataTier = fileData.filter((item) => {
                console.log(item)
                return item['Types'].includes(requestedTypes)
            });
      
            fileDataTier = [...new Set(fileDataTier)];
      
            if (fileDataTier.length === 0) {
              res.send(`Aucun type trouvé pour le type : ${requestedTypes}`);
              return;
            }
      
            res.send(fileDataTier);
          })
        .catch((error) => {
            // Do something if error 
        });
})

app.listen(3001, () => {
  console.log("Serveur lancé sur l'adresse http://localhost:3001/");
})