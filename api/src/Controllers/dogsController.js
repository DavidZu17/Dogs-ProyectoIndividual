
const { Dog, Temperament } = require('../db');
const { Op } = require("sequelize");

const getDogs = async(req , res) => {
    try {  
        //Consulto mi base datos de dogs y retorno todas las razas
        let listaDeRazas = await Dog.findAll();
        if(!listaDeRazas) throw new Error('No hay razas por consultar')

        return res.status(200).json(listaDeRazas);

    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const getDogsById = async ( req , res ) =>{
    try {
        //Se busca id pasado por parametro dentro de la base de datos jumto con su relaciones
        // con la tabla Temperament , se retorna el dog con todos sus atributos y sus relaciones.
        let { idRaza } = req.params;
        idRaza = parseInt(idRaza);
        if(isNaN(idRaza)) throw new Error('El id debe de ser un numero')

        
        const dogFound = await Dog.findByPk(idRaza, {include: [{
            model: Temperament,
            through: {
                attributes: []
            }
        }]})
        if(!dogFound) throw new Error(`Dog por id:${idRazaidRaza} no se encuentra en la base de datos`)
        return res.status(200).json(dogFound);

    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const dogByName = async ( req , res ) =>{
    try {
        const { name } = req.query;

        if(!name) throw new error('Datos incompletos, ingresar name para realizar su busqueda')
        const dogFound = await Dog.findAll({
            where:{
                name : {
                    [Op.iLike]: `%${name}%`
                }
            }
        })

        if(!dogFound) throw new Error(`No se ha encontrado ningun Dog con el name:${name} especificado`)

        return res.status(200).json(dogFound);


    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const postDog = async() => {
    try {
        
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}


module.exports ={
    getDogs,
    getDogsById,
    dogByName, 
    postDog
}