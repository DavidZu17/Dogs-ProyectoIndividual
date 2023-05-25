require('dotenv').config();
const axios = require('axios');
const {API_KEY , API_URL } = process.env ;
const { Dog , Temperament } = require('../db');

const saveInfoInDB = async(req , res) => {
    try {
        const { data: allDogsFromApi } = await axios(`${API_URL}/?api_key=${API_KEY}`);

        if(!allDogsFromApi) throw new Error('Error en la Carga de datos');
        
        allDogsFromApi.forEach( async(dogFromApi) => {
            const [newDog] = await Dog.findOrCreate({
                where:{
                    id : dogFromApi.id,
                },
                defaults:{
                    name : dogFromApi.name,
                    image: dogFromApi.image.url,
                    height: dogFromApi.height.metric,
                    weight : dogFromApi.weight.metric,
                    age : dogFromApi.life_span,
                }
            })
            //Se crea temperamento
            const temperamentFromDogList = dogFromApi.temperament?.split(', ') ;

            temperamentFromDogList?.forEach( async (temperamentDog) => {
                const [newTemperament] = await Temperament.findOrCreate({
                    where: {
                        name : temperamentDog
                    }
                })
                //crear relacion entre dog y temperamento
                await newDog.addTemperament(newTemperament);
            })
            
        });
        return true;
        
    } catch (error) {
        return error;
    }
}

module.exports ={
    saveInfoInDB
}