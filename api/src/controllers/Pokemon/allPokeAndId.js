const {allApi, allDB} = require("./apiDb");
const { Pokemon, Type } = require("../../db");
const axios = require("axios");

const getAllPoke = async (name) => {
    try {
        if (name) {
            try {
                const pokeDB = await Pokemon.findOne({
                    where: {
                        name: name
                    },
                    include: {
                        model: Type,
                        attributes: ["name"],
                        through: {
                            types: [],
                        },
                    },
                })
                if (pokeDB) {
                    let { id, weight, height, image, hp, attack, defense, special_attack, special_defense, speed } = pokeDB;
                    let types = pokeDB.types.map(tp => tp.name)
                    let stats = [
                        ["hp", hp],
                        ["attack", attack],
                        ["defense", defense],
                        ["special_attack", special_attack],
                        ["special_defense", special_defense],
                        ["speed", speed],
                    ];
                    const poke = {
                        name, id, weight, height, image, stats, types
                    }
                    return poke;
                }
                const pokeAPI = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`, {
                });
                if (pokeAPI) {
                    let stats = pokeAPI.data.stats.map(s => [s.stat.name, s.base_stat]);
                    let types = pokeAPI.data.types.map(t => t.type.name);
                    poke = {
                        id: pokeAPI.data.id,
                        name: name,
                        weight: pokeAPI.data.weight,
                        height: pokeAPI.data.height,
                        image: pokeAPI.data.sprites.other.home.front_default,
                        imageBack: pokeAPI.data.sprites.other.home.back_default,
                        imageShiny: pokeAPI.data.sprites.other.home.front_shiny,
                        types: types,
                        stats: stats
                    }
                    return poke;
                }
            } catch (error) {
                return `Sorry, no results could be found for the name ${name} 😞`
            }
        }
        let apiPokes = await allApi("https://pokeapi.co/api/v2/pokemon");
        let dbPokes = await allDB();
        console.log(apiPokes)
        return [...apiPokes, ...dbPokes]
    } catch (error) {
    }
}

const getIdPoke = async (id) => {
    //Si el id es de la DB
    if(isNaN(id)){
        const poke = await Pokemon.findOne({
            where:{
                id: id,
            },
            include: {
                model: Type,
                attributes: ["name"],
                through:{
                    types: [],
                },
            },
        })
        let {name, weight, height, image, hp, attack, defense, special_attack, special_defense, speed} = poke;
        let stats = [
            ["hp", hp],
            ["attack", attack],
            ["defense", defense],
            ["special_attack", special_attack],
            ["special_defense", special_defense],
            ["speed", speed],
        ];
        let types = poke.types.map(t => t.name)
        quantity = {
            id, name, weight, height, image, types, stats
        }
        return quantity;
    }
    //Cuando el id es de la Api
    if(!isNaN(id)){
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`, {
        
        })
        let stats = poke.data.stats.map(s => [s.stat.name, s.base_stat]);
        let types = poke.data.types.map(t => t.type.name);
        quantity = {
            id: id,
            name: poke.data.name,
            weight: poke.data.weight,
            height: poke.data.height,
            image: poke.data.sprites.other.home.front_default,
            imageShiny: poke.data.sprites.other.home.front_shiny,
            types: types,
            stats: stats
        }
        return quantity;
    }
}

module.exports = {getAllPoke, getIdPoke};
