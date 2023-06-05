import { createBrowserHistory } from '@remix-run/router';
import { CARGAR_ALL , CARGAR_DOGS_BY_NAME , ORDER_BY_TEM , ORDER_FILTER , SUBMIT_DOG} from './action.Types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

export const cargarAllDogsByName = ( name ) => {
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
            alert(`${error.response.data.error} \n Se mostraran todos los perros `)
            return dispatch({
                type: CARGAR_DOGS_BY_NAME,
                payload: {dogsByName:[]},
            })
        }

    }
}

export const orderDosgByTem = ( order) =>{
    return{
        type:ORDER_BY_TEM,
        payload: order
    }
}

export const ordenarByFilter = ( A , B ) => {
    return{
        type :ORDER_FILTER,
        payload :{
            A , B
        }
    }
}

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


