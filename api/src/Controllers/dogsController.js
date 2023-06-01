require('dotenv').config();
const axios = require('axios');
const { API_KEY, API_URL, ID_BASE_BD } = process.env;
const { Dog, Temperament } = require('../db');
const { Op } = require("sequelize");
const crypto = require('crypto');




const getDogs = async (req, res) => {
    try {

        const { data: allDogsFromApi } = await axios(`${API_URL}/?api_key=${API_KEY}`);
        if (!allDogsFromApi) throw new Error('Error en la Carga de datos');

        //Se crea los dog con los atributos necesarios y se agrega al array a retornar
        let listaDeRazas = [];
        allDogsFromApi.forEach(async (dogFromApi) => {
            const newDog = {
                id: dogFromApi.id,
                name: dogFromApi.name,
                image: dogFromApi.image.url,
                height: dogFromApi.height.metric,
                weight: dogFromApi.weight.metric,
                age: dogFromApi.life_span,
                alltemperaments: dogFromApi.temperament
            }
            listaDeRazas.push(newDog);
        })

        //Se consulta en la base de datos si hay dog registrados.
        let listRazasBD = await Dog.findAll({
            include: [{
                model: Temperament,
                through: {
                    attributes: []
                }
            }]
        });

        listRazasBD.forEach((raza) => {
            const temperamentsDog = raza.temperaments;
            raza.dataValues.alltemperaments = '';
            temperamentsDog.forEach((temperament) => {
                raza.dataValues.alltemperaments += `${temperament.name},`;
            })
        });

        

        //Si no hay en la base de datos retorna solo la de la Api
        if (listRazasBD.lenght === 0) return res.status(200).json(listaDeRazas);

        //En caso contrario junta las dos bases de datos y las retorna
        return res.status(200).json(listaDeRazas.concat(listRazasBD));
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const getDogsById = async (req, res) => {
    try {
        //Se busca id pasado por parametro dentro de la base de datos jumto con su relaciones
        // con la tabla Temperament , se retorna el dog con todos sus atributos y sus relaciones.
        let { idRaza } = req.params;

        //Se busca primero el Dog en la base de datos con el id incluyendo sus temperamentos
        let dogFound = await Dog.findByPk(idRaza, {
            include: [{
                model: Temperament,
                through: {
                    attributes: []
                }
            }]
        })
        //Si no exite en la base de datos lo buscamos en la Api
        if (!dogFound) {
            //Se carga la lista de dog
            const { data: allDogsFromApi } = await axios(`${API_URL}/?api_key=${API_KEY}`);
            //Se recorre el arreglo hasta encontrar el id especificado
            for (let i = 0; i < allDogsFromApi.length; i++) {
                if (allDogsFromApi[i].id == idRaza) {
                    dogFound = allDogsFromApi[i];
                    break;
                }
            }
            if (!dogFound) throw new Error(`Dog por id:${idRaza} no se encuentra en la base de datos`)
            //Se crea un Dog con los atributos necesarios y sus temperamentos
            const dogApiReturn = {
                id: dogFound.id,
                name: dogFound.name,
                image: dogFound.image.url,
                height: dogFound.height.metric,
                weight: dogFound.weight.metric,
                age: dogFound.life_span,
                alltemperaments: dogFound.temperament
            }

            return res.status(200).json(dogApiReturn);

        }
        //Si encuentra dog en la base de datos continua con el proceso
        //Se agrega sus temperamentos en formato String name para su facil acceso.
        const temperamentsDog = dogFound.temperaments;
        dogFound.dataValues.alltemperaments = '';
        temperamentsDog.forEach((temperament) => {
            dogFound.dataValues.alltemperaments += `${temperament.name},`;
        })

        return res.status(200).json(dogFound);

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const dogByName = async (req, res) => {
    try {
        //Teniendo la la variable por query se procede a bucarlo en la base de datos
        // por el name especificado, retorna las razas de perros con los name que contengan
        // ese name dentro o el mismo, sin importar si es minuscula o mayuscula.
        const { name } = req.query;
        if (!name) throw new Error('Datos incompletos, ingresar name para realizar su busqueda')

        const dogsFoundApi = [];
        //Se carga la lista de dog
        const { data: allDogsFromApi } = await axios(`${API_URL}/?api_key=${API_KEY}`);
        //Se recorre el arreglo hasta encontrar los Dogs con el name especificado
        for (let i = 0; i < allDogsFromApi.length; i++) {

            if (allDogsFromApi[i].name.toLowerCase().includes(name.toLowerCase())) {
                //Se organiza en un nuevo objeto los Dogs con la info necesaria
                const dogNameInclude = {
                    id: allDogsFromApi[i].id,
                    name: allDogsFromApi[i].name,
                    image: allDogsFromApi[i].image.url,
                    height: allDogsFromApi[i].height.metric,
                    weight: allDogsFromApi[i].weight.metric,
                    age: allDogsFromApi[i].life_span,
                    alltemperaments: allDogsFromApi[i].temperament
                }
                //Se agregan en en la lista a retornar
                dogsFoundApi.push(dogNameInclude)
            }
        }
       

        let listRazasBD = await Dog.findAll({
            include: [{
                model: Temperament,
                through: {
                    attributes: []
                }
            }]
        });
        
        listRazasBD.forEach((raza) => {
            const temperamentsDog = raza.temperaments;
            raza.dataValues.alltemperaments = '';
            temperamentsDog.forEach((temperament) => {
                raza.dataValues.alltemperaments += `${temperament.name},`;
            })
        });
        const dogFoundBD = listRazasBD.filter( ( dog ) => dog.name.toLowerCase().includes(name.toLowerCase()) )

        //Error si no se encuentra en ninguna base de datos
        if (dogFoundBD.length === 0 && dogsFoundApi.length === 0) throw new Error(`El Dog con el name:  ${name} , no se encuentra registrado`)
        //Si en las dos bases de datos Api y BD , hubieron coincidencias se retorna los dos arreglos juntos
        if (dogFoundBD.length !== 0 && dogsFoundApi.length !== 0) return res.status(200).json(dogFoundBD.concat(dogsFoundApi));
        //Si solo en una base de datos se encontro coincidencias retorna la correspondiente
        if (dogFoundBD.length === 0 || dogsFoundApi.length === 0) {
            if (dogFoundBD.length !== 0)
                return res.status(200).json(dogFoundBD);
            else
                return res.status(200).json(dogsFoundApi);
        }
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const postDog = async (req, res) => {
    try {
        /* Se realiza la creacion del nuevo Dog para cargarlo en la base de datos con su respectiva
            relaciones con temperaments
        */
        const { name, image, height, weight, age, temperaments } = req.body;
        //Se verifica que los datos hallan sido ingresados en su totalidad y no vacios
        if (!name || !height || !weight || !image || !age || !temperaments
            || name.lenght === 0 || height.lenght === 0 || weight.lenght === 0
            || image.lenght === 0 || age.lenght === 0 || temperaments.lenght === 0)
            return res.status(400).send('Faltan datos para el registro del nuevo Dog');

        //Se carga la lista de dog de Api
        const { data: allDogsFromApi } = await axios(`${API_URL}/?api_key=${API_KEY}`);
        //Se recorre el arreglo hasta encontrar si hay un igual para no tener repetidos, si no lo hay se puede agregar el Dog nuevo
        let dogFound = [];
        for (let i = 0; i < allDogsFromApi.length; i++) {
            if (allDogsFromApi[i].name === name) {
                dogFound = allDogsFromApi[i];
                break;
            }
        }
        if (dogFound.length !== 0) throw new Error(`El dog con name: ${name} ya se encuentra registrado`);



        //Al no encontrarlo en la base de datos de la Api sigue buscando en la base de datos interna
        //Se busca o crea en caso de no encontrarlo un nuevo Dog con sus respectivos atributos
        const newDog = await Dog.findOrCreate({
            where: {
                name
            },
            defaults: {
                id: crypto.randomUUID(),
                image,
                height,
                weight,
                age
            }
        })
        //Error si ya existe el usuario ingresado por formulario
        if (newDog[1] === false) throw new Error(`El dog con name: ${name} ya se encuentra registrado`);

        //se organiza los temperamentos en lista para agregarlos uno por uno
        const listaDeTemperaments = temperaments.split(',');
        //Se crea los temperamentos
        listaDeTemperaments.forEach(async (temperament) => {
            const newTemperament = await Temperament.findOne({
                where: {
                    name: temperament
                }
            })
            // Se agrega la relacion del temperamento con el Dog nuevo
            await newDog[0].addTemperament(newTemperament);
        })
        return res.status(200).json(newDog[0]);
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}


module.exports = {
    getDogs,
    getDogsById,
    dogByName,
    postDog
}