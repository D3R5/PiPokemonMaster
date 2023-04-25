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
            return res.status(400).json("Se requieren parámetros adicionales para completar la acción.");
        }

        const findPoke = await Pokemon.findOne({
            where: {
                name: name.toLowerCase(),
            }
        })
        if (findPoke) {
            return res.status(400).json("Lo siento, pero ese nombre ya ha sido utilizado, prueba con otro nombre.")
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
        res.status(400).json("Se ha producido un error al crear el Pokémon.")
    }
})


router.delete("/:id", async (req, res) => {
    try {
        let id = req.params.id
        if(!isNaN(id)) res.status(400).json("Debe ser un id de la DB");
        
        const findPoke = await Pokemon.findOne({
            where:{
                id: id
            }
        })
        if(!findPoke) res.status(400).json("No se encontro el pokemon en la base de datos.");

        await findPoke.destroy();

        res.json("Pokemon borrado")

    } catch (error) {
        res.status(400).json("Se ha eliminado con éxito el registro del Pokémon.")
    }
})


module.exports = router;