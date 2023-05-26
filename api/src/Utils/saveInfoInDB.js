require('dotenv').config();
const axios = require('axios');
const {API_KEY , API_URL } = process.env ;
const { Temperament } = require('../db');

//Metodo que al iniciar el servidor se encarga de generar automaticamente en la base de datos
// la tabla de temperamentos disponibles que tiene cada Dog en la Api para su uso respectivo.
const saveInfoInDB = async(req , res) => {
    try {
        const { data: allDogsFromApi } = await axios(`${API_URL}/?api_key=${API_KEY}`);

        if(!allDogsFromApi) throw new Error('Error en la Carga de datos');

        for (let i = 0; i < allDogsFromApi.length; i++) {
            const temperamentFromDogList = allDogsFromApi[i].temperament?.split(', ') ;

            temperamentFromDogList?.forEach( async (temperamentDog) => {
                const newTemperament = await Temperament.findOrCreate({
                    where: {
                        name : temperamentDog
                    }
                })
            })
        }        
    } catch (error) {
        return error;
    }
}

module.exports ={
    saveInfoInDB
}