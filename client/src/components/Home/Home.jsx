import SearchBar from '../SearchBar/SearchBar';
import Filters from '../Filters/Filters';
import CardsDogs from '../CardsDogs/CardsDogs';
import './Home.css';
import { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { cargarAllDogsByName, orderDosgByTem } from '../../redux/actions';
const BOTONES_A_MOSTRAR = 3;
const CANTIDAD_POR_PAGINA = 8;
const BOTONES_HERMANOS = 1;


function Home(props) {
    // se destructura lo que viene por props en parametros 
    const { alldogs, allTemperaments, dogsByName } = props;
    //Estados locales que conectan con filtros de temperamentos para mostrar el mensaje adecuado en el componente de lo que se esta mostrando actualmente
    const [busqueda, setBusqueda] = useState('');

    const dispatch = useDispatch();

    //funcion que depliega todos los perros buscados por un nombre en especifico que contengan dichos caracteres
    const functionCargarAllDogsByName = async (name) => {
        const encontro = (error) => {
            if (error) {
                alert(`${error.response.data.error} \n Se mostraran todos los perros `)
                setBusqueda('');
            }
        }
        dispatch(cargarAllDogsByName(name, encontro));
        setBusqueda(name);
    }





    return (
        <div className='containerHome'>
            {/**componente que se encar principalmente de la busqueda por nombre dentro ed la lista de todos los dogs */}
            <SearchBar functionCargarAllDogsByName={functionCargarAllDogsByName} />
            {/**Componente que se encarga de los filtros y ordenamientos  */}
            <Filters allTemperaments={allTemperaments.sort((a, b) => a.name.localeCompare(b.name))} />
            {/** componente que se encarga de desplegar los dosg filtrardos o si se encuentran buscados por nombre los despliega a la interfaz
             * mas el mensaje de lo que se muestra
             */}
            <CardsDogs dogs={dogsByName.length !== 0 ? dogsByName : alldogs}
                title={busqueda.length !== 0 ? `Se muestran los Dogs por nombre que contienen: ${busqueda} ` :
                    `Todos los perros `}
                botonesaMostrar={BOTONES_A_MOSTRAR}
                cantidadPorPagina={CANTIDAD_POR_PAGINA}
                botonesHermanos={BOTONES_HERMANOS}
            />
        </div>
    )
}
export function mapStateToProps(state) {
    return {
        dogsByName: state.dogsByName,
    }
}


export default connect(mapStateToProps, null)(Home);