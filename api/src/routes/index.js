
const { getDogs, getDogsById, dogByName, postDog } = require('../Controllers/dogsController');
const { getTemperaments } = require('../Controllers/TemperamentsController');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = require('express').Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/dogs' , ( req , res ) =>{
    //Se clasifica si hay o no algo en query para asi diferenciar la ruta especifica a realizar
    const { name } = req.query;
    if(name)
        dogByName(req , res);    
    else
        getDogs(req , res);
    
});

router.get('/dogs/:idRaza' , ( req , res ) =>{
    getDogsById(req , res);
});

router.post('/dogs' , ( req , res ) =>{
    postDog(req , res);
});

router.get('/temperaments' , ( req , res ) =>{
    getTemperaments(req , res);
});

module.exports = router;
