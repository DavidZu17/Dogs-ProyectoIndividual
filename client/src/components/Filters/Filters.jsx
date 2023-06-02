import './Filters.css';
import { useDispatch } from 'react-redux';
import { orderDosgByTem , ordenarByFilter } from '../../redux/actions';
import { useEffect, useState } from 'react';


function Filters({ handleFiltTem , allTemperaments }) {
    const dispatch = useDispatch();
    const [ orderAsOrDes , setOrderAsOrDes ] = useState ('');
    const [ orderByNameOrWeight , setOrderByNameOrWeight ] = useState ('');
   

/**Se filtran los dogs mostrados en interfaz por temperamento selecionado */
    // const handleFiltTem = ( evento ) => {
    //     dispatch( orderDosgByTem( evento.target.value) );
    // }
    

    const handleOrder = () =>{
        if(orderAsOrDes.length !== 0 && orderByNameOrWeight.length !== 0 )
            dispatch( ordenarByFilter( orderAsOrDes , orderByNameOrWeight ) );
        else
            alert(' Para filtrar se debe de tener un tipo ( Nombre / Peso ) y un tipo (Ascendente / Descendente )')
        
    }

    const orderA = ( evento ) =>{
       setOrderAsOrDes(evento.target.defaultValue)
    }

    const orderB = ( evento ) =>{
        setOrderByNameOrWeight(evento.target.defaultValue);
    }

    

    return (
        <div className='containerFilters'>

            <div className='ordenTemperaments'>
                <h4>Filtrar por Temperamento</h4>
                <select mode="multiple" onChange={ handleFiltTem } className='selectOption'>
                    <option value='allDogs' key='0'>All Dogs</option>
                    {allTemperaments?.map(({ name, id }) => (
                        <option value={name} key={id}>
                            {name}
                        </option>
                    ))}
                </select>


            </div>

            <div className='orderTipo'>
                <input type="radio" id="radioN" value="N" name='orderB' onChange={ orderB } /> <label htmlFor="radioN">Nombre</label><br />
                <input type="radio" id="radioP" value="P" name='orderB' onChange={ orderB } /><label htmlFor="radioP">Peso</label>
            </div>


            <div className='orderAsOrDes'>
                <input type="radio" id="radioA" value="A" name='orderA' onChange={ orderA } /><label htmlFor="radioA">Ascendente</label><br />
                <input type="radio" id="radioD" value="D" name='orderA' onChange={ orderA } /> <label htmlFor="radioD">Descendente</label>
            </div>
            <button onClick={handleOrder}>Ordenar</button>

        </div>
    );
}

export default Filters;