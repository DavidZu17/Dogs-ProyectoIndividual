
const { getDogs, getDogsById, dogByName } = require('../Controllers/dogsController');
const { getTemperaments } = require('../Controllers/TemperamentsController');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = require('express').Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/dogs' , ( req , res ) =>{
    const { name } = req.query;
    if(name)dogByName(req , res);
    
    else
        getDogs(req , res);
    
});

router.get('/dogs/:idRaza' , ( req , res ) =>{
    getDogsById(req , res);
});

router.get('/temperaments' , ( req , res ) =>{
    getTemperaments(req , res);
});

module.exports = router;
