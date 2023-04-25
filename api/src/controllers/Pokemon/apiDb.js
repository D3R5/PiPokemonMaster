const axios = require("axios");
const {Pokemon, Type} = require("../../db");


const allApi = async (url) => {
    try {
        //! traigo todos los Pokemons
        const apiResults = await axios.get(url, {
        })
        const apiNext = await axios(apiResults.data.next, {
        })
        const indexPokes = [...apiResults.data.results, ...apiNext.data.results]


        //! Info de todos los Pokemons
        let allPokes = [];
        for (const pokemon of indexPokes) {
            const poke = await axios.get(pokemon.url, {
            })
            const { id, height, weight, name } = poke.data;
            const stats = poke.data.stats.map(s => [s.stat.name, s.base_stat])
            const types = poke.data.types.map(t => t.type.name);
            const image = poke.data.sprites.other.home.front_default;
            const imageShiny = poke.data.sprites.other.home.front_shiny;
            allPokes.push({ id, height, weight, name, stats, types, image, imageShiny })
        }
        return allPokes
    } catch (error) {
    }
}




const allDB = async () => {
    try {
        let dbData = await Pokemon.findAll({
            include: {
                model: Type,
                attributes: ["name"],
                through:{
                    types: [],
                },
            },
        });
        let quantity = [];
        for (const pokemon of dbData) {
            let {name, id, image, hp, attack, defense, special_attack, special_defense, speed, weight, height, createDB} = pokemon;
            let types = pokemon.types.map(tp => tp.name)
            let stats = [
                ["hp", hp],
                ["attack", attack],
                ["defense", defense],
                ["special-attack", special_attack],
                ["special-defense", special_defense],
                ["speed", speed]
            ]
            quantity.push({name, id, image, stats, weight, height, types, createDB})
        }
        return quantity;

    } catch (error) {
    }
}




module.exports = {allApi, allDB};