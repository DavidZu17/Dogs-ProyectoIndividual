import SearchBar from '../SearchBar/SearchBar';
import Filters from '../Filters/Filters';
import CardsDogs from '../CardsDogs/CardsDogs';
import './Home.css';
import { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { cargarAllDogsByName } from '../../redux/actions';
import axios from 'axios';


function Home(props) {
    const { alldogs, allTemperaments ,dogsByName } = props;
    const dispatch = useDispatch();
    const [dogsSearch, setDogSearch] = useState([]);

    const functionCargarAllDogsByName = async (name) => {
        dispatch( cargarAllDogsByName( name ));
    }

    

    return (
        <div className='containerHome'>
            <SearchBar functionCargarAllDogsByName={functionCargarAllDogsByName} />
            <Filters allTemperaments={allTemperaments} />
            <CardsDogs dogs={ dogsByName.length !== 0 ? dogsByName:  alldogs} />
        </div>
    )
}
export function mapStateToProps(state) {
    return{
        dogsByName : state.dogsByName,
    }
}

export default connect(mapStateToProps,null)(Home);