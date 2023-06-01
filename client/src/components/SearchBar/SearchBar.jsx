import './SearchBar.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



function SearchBar ( { functionCargarAllDogsByName }){
    const navigate = useNavigate();
    let [ name , setName] = useState('');

    const handleChange =(evento)=>{
        setName(evento.target.value);
        evento.preventDefault();

     }
  
     const handleEnter =(evento) =>{
        if(evento.key === 'Enter'){            
            functionCargarAllDogsByName( name );
            evento.preventDefault();
        }
     }

    const handleAgregar = () =>{
        navigate('/FormAgregar');
    }
    return(
        <div className='containerSearchBar'>  
            <h3>DOGS 🐾 </h3>
            <input type='search' className='searchInput' onChange={handleChange} value={ name } placeholder='Buscar perro por nombre...' onKeyUp={handleEnter} />                   
            <button className='searchBoton' onClick={ () => functionCargarAllDogsByName( name )} ></button>
            <button className='searchBotonDogNuevo' onClick={ handleAgregar } > Agregar Dog Nuevo</button>
        </div>
    );
}




 
 export default SearchBar;