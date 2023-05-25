const {  Temperament } = require('../db');


const getTemperaments = async(req , res) => {
    try {  
        //Consulto mi base datos de temperaments y retorno todas.
        let listaDeTemperaments = await Temperament.findAll();
        if(!listaDeTemperaments) throw new Error('No hay temperamentos por consultar')

        return res.status(200).json(listaDeTemperaments);

    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

module.exports = {
    getTemperaments
}