import { CARGAR_ALL, CARGAR_DOGS_BY_NAME, ORDER_BY_TEM, ORDER_FILTER, SUBMIT_DOG } from './action.Types';
import { fuctionFilterByType } from '../Utils/fuctionReducer';


const inicitialState = {
    temperaments: [],
    dogs: [],
    copyDog: [],
    dogsByName: [],
    copydogByName: []

}



export default function reducer(state = inicitialState, { type, payload }) {
    switch (type) {
        /** Se carga todo de la base de datos para inicializar con todos lo perros y los temperamentos correspondientes */
        case CARGAR_ALL:
            return {
                ...state, dogs: payload.dogs, copyDog: payload.dogs, temperaments: payload.temperaments
            }
        /** Se cargan los dog por nombre que indique el usuario y se guarda tambien una copia para luego realizar su debido filtrado */
        case CARGAR_DOGS_BY_NAME:
            return {
                ...state, dogsByName: payload.dogsByName, copydogByName: payload.dogsByName
            }
        /**Se oredena por temperamento elegido dependiendo si se encuentra la pagina con todos los perros o con los perros indicados por name */
        case ORDER_BY_TEM:
            /** lista a retornar filtrada por los temperamentos */
            let copyOrder = [];
            /**Si el usuario tiene dogs buscados por name en la pagina se filtran esos perros */
            if (state.dogsByName.length !== 0) {
                /**Se verifica primero si el comando es traer los dogs para no consumir recursos filtrando */
                if (payload === 'allDogs') {
                    return {
                        ...state,
                        dogsByName: [...state.copydogByName]
                    }
                }
                /**se filtra los perros por temperamento indicado */
                state.copydogByName.forEach((dog) => {
                    if (dog.alltemperaments?.includes(payload))
                        copyOrder.push(dog);
                });
                return {
                    ...state,
                    dogsByName: copyOrder
                }
            }
            else {
                /** En caso de que se tenga en lista todos los perros se filtra esa lista
                 * Se verifica primero si el comando es traer los dogs para no consumir recursos filtrando
                 */
                if (payload === 'allDogs') {
                    return {
                        ...state,
                        dogs: [...state.copyDog]
                    }
                }
                /**se filtra los perros por temperamento indicado */
                state.copyDog.forEach((dog) => {
                    if (dog.alltemperaments?.includes(payload))
                        copyOrder.push(dog);
                });
                return {
                    ...state,
                    dogs: copyOrder
                }
            }
        case ORDER_FILTER:
            let copyFilter = [];
            if (state.dogsByName.length !== 0) {
                copyFilter = [...state.dogsByName]
                if (payload.B === 'N') {
                    const list1 = copyFilter.sort((a, b) => a.name.localeCompare(b.name));
                    return {
                        ...state,
                        dogsByName: payload.A === 'A' ? list1 : list1.reverse()
                    }
                }
                
                const list1 = fuctionFilterByType(  copyFilter );                
                return {
                    ...state,
                    dogsByName: payload.A === 'A' ? list1 : list1.reverse()
                }
            }

            copyFilter = [...state.dogs]
            if (payload.B === 'N') {
                const list1 = copyFilter.sort((a, b) => a.name.localeCompare(b.name));
                return {
                    ...state,
                    dogs: payload.A === 'A' ? list1 : list1.reverse()
                }
            }
            
            const list1 = fuctionFilterByType(  copyFilter );
            return {
                ...state,
                dogs: payload.A === 'A' ? list1 : list1.reverse()
            }

        case SUBMIT_DOG:
            return{
                ...state , dogs: [...state.dogs , payload] 
            }
        default:
            return { ...state };
    }

}

