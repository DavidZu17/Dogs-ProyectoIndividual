const validation = ( dogNew ) =>{
    const errors = {};
    //constantes de regex para la validacoin de string y url
    const regexURL = /^(ftp|http|https):\/\/[^ "]+$/ ;
    const regexStringNum = /\d/;

//se valida si el nombre cumple con las validacion de contener un nombre, un string no mayor a 30 caractres y que no contenga un numero 
    if(!dogNew.name ){
        errors.name = ' Debe de ingresar un Nombre para el Dog nuevo.'        
    }else if ( dogNew.name.length > 30){
        errors.name = 'Ingresar un nombre menor de 30 caracteres.'
    }else if( regexStringNum.test(dogNew.name) ){
        errors.name = 'El nombre no puede contener caracteres numericos'
    }
    //Se valida que halla una altura minima como necesaria, que sea menor que la mayor si existe la mayor y que sean numeros ingresados
    if(!dogNew.heightMin){
        errors.heightMin = 'Ingresar una altura minima'
    }else if(!regexStringNum.test(dogNew.heightMin)){
        errors.heightMin = 'La altura minima debe de ser un numero';
    }else if(parseInt(dogNew.heightMin) <= 0 ){
        errors.heightMin = 'la altura minima debe ser mayor a cero'
    }else if(dogNew.heightMax && dogNew.heightMin){
        if(!regexStringNum.test(dogNew.heightMax)){
            errors.heightMax = 'La altura maxima debe de ser un numero';
        }else if(parseInt(dogNew.heightMax) <= 0 ){
            errors.heightMax = 'la altura maxima debe ser mayor a cero'
        }else if( parseInt(dogNew.heightMax) < parseInt(dogNew.heightMin) ){
            errors.heightMax = 'La altura maxima debe de ser mayor a la minima'
        }
    }
    //Se valida que halla un peso minima como necesario, que sea menor que el mayor si existe el mayor y que sean numeros ingresados
    if(!dogNew.weightMin){
        errors.weightMin = 'Ingresar un peso minimo'
    }else if(!regexStringNum.test(dogNew.weightMin)){
        errors.weightMin = 'El peso minimo debe de ser un numero';
    }else if(parseInt(dogNew.weightMin) <= 0 ){
        errors.weightMin = 'El peso minimo debe ser mayor a cero'
    }else if(dogNew.weightMax && dogNew.weightMin){
        if(!regexStringNum.test(dogNew.weightMax)){
            errors.weightMax = 'El peso maximo debe de ser un numero';
        }else if(parseInt(dogNew.weightMax) <= 0 ){
            errors.weightMax = 'El peso maximo debe ser mayor a cero'
        }else if( parseInt(dogNew.weightMax) < parseInt(dogNew.weightMin) ){
            errors.weightMax = 'El peso maximo debe de ser mayor la minimo'
        }
    }
    //Se valida que halla una edad minima como necesaria, que sea menor que la mayor si existe la mayor y que sean numeros ingresados
    if(!dogNew.ageMin){
        errors.ageMin = 'Ingresar una edad minima'
    }else if(!regexStringNum.test(dogNew.ageMin)){
        errors.ageMin = 'La edad minima debe de ser un numero';
    }else if(parseInt(dogNew.ageMin) <= 0 ){
        errors.ageMin = 'La edad minima debe ser mayor a cero'
    }else if(dogNew.ageMax && dogNew.ageMin){
        if(!regexStringNum.test(dogNew.ageMax)){
            errors.ageMax = 'La edad maxima debe de ser un numero';
        }else if(parseInt(dogNew.ageMax) <= 0 ){
            errors.ageMax = 'La edad maxima debe ser mayor a cero'
        }else if( parseInt(dogNew.ageMax) < parseInt(dogNew.ageMin) ){
            errors.ageMax = 'La edad maxima debe de ser mayor a la minima'
        }
    }
// se vailda que si se ingresa una url de imagen sea una url correspondiente
    if( dogNew.image.length > 0 ){        
        if(!regexURL.test( dogNew.image))
             errors.image = 'Ingresar una url valida'
    }
    //Se valida que al menos halla seleccionado un temperamento para el dognuevo
    if(dogNew.allTemperaments.length === 0){
        errors.allTemperaments = 'Ingresar al menos un temperamento';
    }


    return errors ;
}
 
export default validation;