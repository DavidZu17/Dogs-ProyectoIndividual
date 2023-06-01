const validation = ( dogNew ) =>{
    const errors = {};
    const regexURL = /^(ftp|http|https):\/\/[^ "]+$/ ;
    const regexStringNum = /\d/;

    if(!dogNew.name ){
        errors.name = ' Debe de ingresar un Nombre para el Dog nuevo.'        
    }else if ( dogNew.name.length > 30){
        errors.name = 'Ingresar un nombre menor de 30 caracteres.'
    }else if( regexStringNum.test(dogNew.name) ){
        errors.name = 'El nombre no puede contener caracteres numericos'
    }
    
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

    if( !regexURL.test( dogNew.image) ){
        errors.image = 'Ingresar una url valida'
    }
    if(dogNew.allTemperaments.length === 0){
        errors.allTemperaments = 'Ingresar al menos un temperamento';
    }


    return errors ;
}
 
export default validation;