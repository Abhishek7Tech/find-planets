const {planets} = require("../../models/planets.model");


async function getAllPlanets(req,res){
    const response = await planets();
    return await res.status(200).json(response);
}

module.exports ={
    getAllPlanets,
}