import './Filters.css';
import { useDispatch } from 'react-redux';
import { orderDosgByTem, ordenarByFilter } from '../../redux/actions';
import { useEffect, useState } from 'react';

//Componente encargado de todo lo que tenga que ver de los filtros 
// de temperamentos y los de ordenamiento
function Filters({ allTemperaments }) {
    const dispatch = useDispatch();
    //Estados que guardan las selecciones de ordenamiento
    const [orderAsOrDes, setOrderAsOrDes] = useState('');
    const [orderByNameOrWeight, setOrderByNameOrWeight] = useState('');

    //se filtra por temepramento indicado 
    const handleFiltTem = async (evento) => {
        if (evento.target.value !== 'T') {
            try {
                dispatch(orderDosgByTem(evento.target.value));
            } catch (error) {
                alert(error.message)
            }
        }
        else {
            alert('Selecione uno diferente de el primer item para filtrar por temperamento deseado o all Temperament para todos los temperamentos en la lista seleccionanda')
        }
    }



    // fncion que despacha al reducer el ordenamiento por nombre o peso 
    // dependiendo de si es ascedente o descendente
    const handleOrder = () => {
        if (orderAsOrDes.length !== 0 && orderByNameOrWeight.length !== 0)
            dispatch(ordenarByFilter(orderAsOrDes, orderByNameOrWeight));
        else
            alert(' Para filtrar se debe de tener un tipo ( Nombre / Peso ) y un tipo (Ascendente / Descendente )')

    }
    //actualiza el estado de ordenamiento ascedente o descendente
    const orderA = (evento) => {
        setOrderAsOrDes(evento.target.defaultValue)
    }
    // actualiza el estado de ordenamiento por nombre o por peso 
    const orderB = (evento) => {
        setOrderByNameOrWeight(evento.target.defaultValue);
    }



    return (
        <div className='containerFilters'>

            <div className='ordenTemperaments'>
                <h4>Filtro por :</h4>
                <select mode="multiple" onChange={handleFiltTem} className='selectOption'>
                    <option value="T">Temperamentos</option>
                    <option value='allTemperaments' key='0'>All Temperamentos</option>
                    {/** Se despliegan los temperamentos pasados por parametros que vienen desde la carga de datos de la api */}
                    {allTemperaments?.map(({ name, id }) => (
                        <option value={name} key={id}>
                            {name}
                        </option>
                    ))}
                </select>
            </div>
            <div className='divOrden'>
                <div className='orderTipo'>
                    <input type="radio" id="radioN" value="N" name='orderB' onChange={orderB} /> <label htmlFor="radioN">Nombre</label><br />
                    <input type="radio" id="radioP" value="P" name='orderB' onChange={orderB} /><label htmlFor="radioP">Peso</label>
                </div>
                <div className='orderAsOrDes'>
                    <input type="radio" id="radioA" value="A" name='orderA' onChange={orderA} /><label htmlFor="radioA">Ascendente</label><br />
                    <input type="radio" id="radioD" value="D" name='orderA' onChange={orderA} /> <label htmlFor="radioD">Descendente</label>
                </div>
                <button onClick={handleOrder} className='botonOrdenar'>Ordenar</button>
            </div>


        </div>
    );
}

export default Filters;