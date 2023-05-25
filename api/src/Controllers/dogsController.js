
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
        if(!dogFound) throw new Error(`Dog por id:${idRaza} no se encuentra en la base de datos`)
        return res.status(200).json(dogFound);

    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const dogByName = async ( req , res ) =>{
    try {
        //Teniendo la la variable por query se procede a bucarlo en la base de datos
        // por el name especificado, retorna las razas de perros con los name que contengan
        // ese name dentro o el mismo, sin importar si es minuscula o mayuscula.
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

const postDog = async( req , res ) => {
    try {
        /* Se realiza la creacion del nuevo Dog para cargarlo en la base de datos con su respectiva
            relaciones con temperaments

        */
        const { name, image, height, weight, age , temperaments } = req.body;
       //Se verifica que los datos hallan sido ingresados en su totalidad y no vacios
        if(!name || !height || !weight|| !image || !age || !temperaments
           || !name.lenght === 0 || !name.height === 0 || !name.weight === 0 
           || !name.image === 0 || !name.age === 0 || !name.temperament === 0  ) 
           return res.status(400).send('Faltan datos para el registro del nuevo Dog');
        
        //Se toma como referencia la cnatidad de Dogs registrados y se genera una key
        // unica
        let cantidadTotalDog = await Dog.count() ;
        cantidadTotalDog++;        
        let isId = await Dog.findByPk(cantidadTotalDog);
        while(isId){
            isId = await Dog.findByPk(cantidadTotalDog);
            cantidadTotalDog++;
        }

        const [ newDog ] = await Dog.findOrCreate({
            where:{
                name,
                image,
                height,
                weight,
                age
            },
            defaults:{
                id : cantidadTotalDog
            }           
        })
        
        if(newDog[1]=== false) throw new Error(`El dog con name: ${name} ya se encuentra creado`);
       //se organiza los temperamentos en lista para agregarlos uno por uno
        const listaDeTemperaments = temperaments.split(',');
        //Se crea los temperamentos
        listaDeTemperaments.forEach( async (temperament) => {
            const newTemperament = await Temperament.findOne({
                where:{
                    name: temperament
                }
            })
            // Se agrega la relacion del temperamento con el Dog nuevo
            await newDog.addTemperament(newTemperament);
        })
        
        return res.status(200).json(newDog);



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