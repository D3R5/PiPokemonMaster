const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const getPokemons = require("./getPokemons.js")
const newPokemon = require("./newPokemon.js");
const getTypes = require("./types.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/pokemons", getPokemons)

router.use("/pokemons", newPokemon)

router.use("/types", getTypes)

module.exports = router;
