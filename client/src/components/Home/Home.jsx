import SearchBar from '../SearchBar/SearchBar';
import Filters from '../Filters/Filters';
import CardsDogs from '../CardsDogs/CardsDogs';
import './Home.css';
import { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { cargarAllDogsByName } from '../../redux/actions';
const BOTONES_A_MOSTRAR = 3;
const CANTIDAD_POR_PAGINA = 8 ;
const BOTONES_HERMANOS = 1;


function Home(props) {
    const { alldogs, allTemperaments ,dogsByName } = props;
    const [ busqueda, setBusqueda ] = useState('');
    const dispatch = useDispatch();

    const functionCargarAllDogsByName = async (name) => {
         await dispatch( cargarAllDogsByName( name ));
        setBusqueda(name);
    }

 
    

    return (
        <div className='containerHome'>
            <SearchBar functionCargarAllDogsByName={functionCargarAllDogsByName} />
            <Filters allTemperaments={allTemperaments} />
            <CardsDogs  dogs={ dogsByName.length !== 0 ? dogsByName:  alldogs} 
                        title={ busqueda.length !== 0 ? `Se muestran los Dogs por nombre que contienen: ${busqueda}`:  'Todos los Perros' }
                        botonesaMostrar={BOTONES_A_MOSTRAR}
                        cantidadPorPagina={CANTIDAD_POR_PAGINA}
                        botonesHermanos={BOTONES_HERMANOS}/>
        </div>
    )
}
export function mapStateToProps(state) {
    return{
        dogsByName : state.dogsByName,
    }
}


export default connect(mapStateToProps,null)(Home);