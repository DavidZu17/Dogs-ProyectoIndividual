import './SearchBar.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import imageLogo from '../../images/logoSearch.png';
import imageDogsLogo from '../../images/logoDogs.png';



function SearchBar({ functionCargarAllDogsByName }) {
    const navigate = useNavigate();
    let [name, setName] = useState('');

    const handleChange = (evento) => {
        setName(evento.target.value);
        evento.preventDefault();

    }

    const handleEnter = (evento) => {
        if (evento.key === 'Enter') {
            functionCargarAllDogsByName(name);
            evento.preventDefault();
        }
    }

    const handleAgregar = () => {
        navigate('/FormAgregar');
    }
    return (
        <div className='containerSearchBar'>
            <img src={ imageDogsLogo } name='imageDogsLogo' className='imageDogsLogo' ></img>
            <img src={ imageLogo } name='imageLogo' className='logoSearch'></img>
            <input type='search' className='searchInput' onChange={handleChange} value={name} placeholder='Buscar perro por nombre...' onKeyUp={handleEnter} />
            <button className='iconoLupaSearch'></button>




            <div className='divBotonAgregar'>

                <button className='searchBotonDogNuevo' onClick={handleAgregar} ></button>
                <label>AGREGAR DOG</label>
            </div>

        </div>
    );
}





export default SearchBar;