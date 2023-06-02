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
    const { alldogs, allTemperaments, dogsByName } = props;
    const [busqueda, setBusqueda] = useState('');
    const [busquedaPorTemperamento, setBusquedaPorTemperamento] = useState('');
    // [totalDePaginas ,setTotalDePagina] = useState(Math.ceil((alldogs.length) / CANTIDAD_POR_PAGINA));

    const dispatch = useDispatch();

    const functionCargarAllDogsByName = async (name) => {
        await dispatch(cargarAllDogsByName(name));
        setBusqueda(name);
        dispatch(orderDosgByTem(busquedaPorTemperamento))


    }


    const handleFiltTem = async (evento) => {
        if (busqueda.length === '') {
            dispatch(orderDosgByTem(evento.target.value));
            setBusquedaPorTemperamento(evento.target.value)
        }
        await dispatch(cargarAllDogsByName(busqueda));
       
        dispatch(orderDosgByTem(evento.target.value));
        setBusquedaPorTemperamento(evento.target.value)

    }



    return (
        <div className='containerHome'>
            <SearchBar functionCargarAllDogsByName={functionCargarAllDogsByName} />
            {/* <Filters allTemperaments={allTemperaments} /> */}
            <Filters handleFiltTem={handleFiltTem} allTemperaments={allTemperaments.sort( ( a, b ) => a.name.localeCompare(b.name))} />
            <CardsDogs dogs={dogsByName.length !== 0 ? dogsByName : alldogs}
                title={busqueda.length !== 0 ? `Se muestran los Dogs por nombre que contienen: ${busqueda} ${busquedaPorTemperamento.length !== 0 ? `Con temperamento ${busquedaPorTemperamento}` : ''} ` :
                    `Todos los perros ${busquedaPorTemperamento.length !== 0 ? `Con temperamento ${busquedaPorTemperamento}` : ''}`}
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