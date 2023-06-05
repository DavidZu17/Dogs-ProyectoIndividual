import './SearchBar.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import imageLogo from '../../images/logoSearch.png';
import imageDogsLogo from '../../images/logoDogs.png';


//Componente que se encarga de la busqueda por nombre especificado y contiene el boton de agregar un nuevo dog  a la bd 
function SearchBar({ functionCargarAllDogsByName }) {
    const navigate = useNavigate();
    //estado local que contiene lo que se escribe simultaneamnete en el input de busqueda 
    let [name, setName] = useState('');
//funcion que genera la simultaneadad de la informacino escrita en el input de busqueda
    const handleChange = (evento) => {
        setName(evento.target.value);
        evento.preventDefault();

    }
//funcion encargada de hacer la busqueda de lo escrito en el input
    const handleEnter = (evento) => {
        if (evento.key === 'Enter') {
            functionCargarAllDogsByName(name);
            evento.preventDefault();
        }
    }
//funcion que redireje al fomrulario de agregar un dog nuevo
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