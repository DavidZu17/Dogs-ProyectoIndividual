import { createBrowserHistory } from '@remix-run/router';
import { CARGAR_ALL , CARGAR_DOGS_BY_NAME , ORDER_BY_TEM , ORDER_FILTER , SUBMIT_DOG} from './action.Types';
import axios from 'axios';

//Funcion que se encarga de cargar todos los dogs y temperamentos de la base de datos atra ves de la rutas del servidor 
//para al iniciar todos los dog cargadps y mostrados y los temperamentos en la lista de filtros
export const cargarAllDogsBD = () => {
    const endpointDogs = 'http://localhost:3001/dogs';
    const endpointTemperaments = 'http://localhost:3001/temperaments';
    return async (dispatch) => {
        try {
            const { data: dogs } = await axios(endpointDogs)
            const { data: temperaments } = await axios(endpointTemperaments)

            return dispatch({
                type: CARGAR_ALL,
                payload: {
                    dogs,
                    temperaments
                },
            })
        } catch (error) {
            alert(`${error.response.data.error}`)        }

    }
}
//Se encarga de cargar todos los dosg por el nombre buscado por paramemtro po medio de la ruta del servidor si no encuntra retorna una lita vacia para asi 
// desplegar todos los dogs y un mensaje con la novedad
export const cargarAllDogsByName = ( name , encontro ) => {
    const endpointDogs = `http://localhost:3001/dogs/?name=${ name }`;
    return async (dispatch) => {
        try {
            const { data: dogsByName } = await axios(endpointDogs);
            return dispatch({
                type: CARGAR_DOGS_BY_NAME,
                payload: {
                    dogsByName
                },
            })
        } catch (error) {
            encontro ( error );
            return dispatch({
                type: CARGAR_DOGS_BY_NAME,
                payload: {dogsByName:[]},
            })
        }

    }
}
// se encarga de despacahr la accoin de  ordenar por temperamento 
export const orderDosgByTem = ( order) =>{
    return{
        type:ORDER_BY_TEM,
        payload: order
    }
}
// se encarga de despachar la accin de  despachar de filtrar los dosgs mostrados por nombre o tipo y si es ascedente o descendente 
export const ordenarByFilter = ( A , B ) => {
    return{
        type :ORDER_FILTER,
        payload :{
            A , B
        }
    }
}
//se encarga de despachar la ruta de agreagr un nuevo dog a la bd 
export const submitDog = ( dogNew ) => {
    const endpointDogs = 'http://localhost:3001/dogs/';
    return async (dispatch) => {
        try {
            const { data: dogN } = await axios.post( endpointDogs, dogNew )
            return dispatch({
                type: SUBMIT_DOG,
                payload : dogN
            })
        } catch (error) {
            alert(`${error.message}`)        
         }

    }
}


