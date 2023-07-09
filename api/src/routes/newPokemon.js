const { Router } = require("express");
const { Pokemon, Type } = require("../db");
const getTypes = require("../controllers/Type/createTypes");

const router = Router();

router.post("/", async (req, res) => {
    let { name, image, hp, attack, defense, special_attack, special_defense, speed, types, height, weight } = req.body;
    try {
        if (!name ||
            !hp ||
            !attack ||
            !defense ||
            !special_attack ||
            !special_defense ||
            !speed ||
            !types ||
            !image ||
            !height ||
            !weight
        ) {
            return res.status(400).json("Additional parameters are required to complete the action.");
        }
        const findPoke = await Pokemon.findOne({
            where: {
                name: name.toLowerCase(),
            }
        })
        if (findPoke) {
            return res.status(400).json("Sorry, but that name has already been used, try another name.")
        }
        const newPoke = await Pokemon.create({
            name: name.toLowerCase(),
            image,
            hp,
            attack,
            defense,
            special_attack,
            special_defense,
            speed,
            weight,
            height
        })
        const typesObj = await getTypes(types);
        const complete = await newPoke.addType(typesObj);
        return res.json(newPoke)
    } catch (error) {
        res.status(400).json("An error occurred while creating the Pokémon.")
    }
})

router.delete("/:id", async (req, res) => {
    try {
        let id = req.params.id
        if(!isNaN(id)) res.status(400).json("It must be an id of the DB");
        
        const findPoke = await Pokemon.findOne({
            where:{
                id: id
            }
        })
        if(!findPoke) res.status(400).json("The pokemon was not found in the database.");
        await findPoke.destroy();
        res.json("deleted pokemon")
    } catch (error) {
        res.status(400).json("The Pokémon's registration has been successfully removed.")
    }
})

module.exports = router;
