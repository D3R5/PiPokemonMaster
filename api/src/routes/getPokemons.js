const {Router} = require("express");
const {getAllPoke, getIdPoke} = require("../controllers/Pokemon/allPokeAndId");

const router = Router();

router.get("/", async (req, res) => {
    try {
        let name = req.query.name;
        if(name){
            const pokes = await getAllPoke(name.toLowerCase());
            res.json(pokes);
        }else{
            const pokes = await getAllPoke();
            res.json(pokes);
        }
    } catch (error) {
        res.status(400).json("The information could not be obtained.")
    }
})

router.get("/:id", async (req, res) =>{
    try {
        const data = await getIdPoke(req.params.id)
        res.json(data)
    } catch (error) {
        res.status(400).json("pokemon not found")
    }
})

module.exports = router;
