const {Type} = require("../../db");
const axios = require("axios");

const newTypes = async(typesInput) => {
    try {
        const validateTypes = await Type.findAll();
        if(validateTypes.length > 0 && !typesInput){
            return validateTypes
        }
        
        const data = await axios("https://pokeapi.co/api/v2/type");
        const newTypes = await Type.bulkCreate(data.data.results);

        if(typesInput){
            let quantity = [];
            for (const nameType of typesInput) {
                const type = await Type.findOne({where: {name: nameType}})
                quantity = [...quantity, type];
            }
            
            return quantity;
        }

        return newTypes;
    } catch (error) {
        console.log("controllers/Type/newTypes", error)
    }
}

module.exports = newTypes;