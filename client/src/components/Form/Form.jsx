import './Form.css';
import { useState } from 'react';
import validation from '../Validation/Validation';
import { useDispatch } from 'react-redux';
import { submitDog } from '../../redux/actions';
import { Link } from 'react-router-dom';



const Form = ({ allTemperaments }) => {
    const [dogNew, setDogNew] = useState({ name: '', heightMin: '', heightMax: '', weightMin: '', weightMax: '', ageMin: '', ageMax: '', image: '', allTemperaments: [] });
    const [errors, setErrors] = useState({ name: '', heightMin: '', heightMax: '', weightMin: '', weightMax: '', ageMin: '', ageMax: '', image: '', allTemperaments: [] });

    const dispatch = useDispatch();


    const handleSubmit = (evento) => {
        if (Object.keys( errors ).length === 0 ) {
            let stringTemperaments = dogNew.allTemperaments.toString();
            const dogDispa = {
                name : dogNew.name,
                height : dogNew.heightMax.length !== 0? `${dogNew.heightMin} - ${dogNew.heightMax}`: `${dogNew.heightMin}`,
                weight : dogNew.weightMax.length !== 0? `${dogNew.weightMin} - ${dogNew.weightMax}`: `${dogNew.weightMin}`,
                age : dogNew.ageMax.length !== 0? `${dogNew.ageMin} - ${dogNew.ageMax}`: `${dogNew.ageMin}`,
                image : dogNew.image,
                temperaments :stringTemperaments
            }

            dispatch( submitDog( dogDispa ) );

        } else {
            alert('Debe de llenar todos los campos para ingresar');
        }
        evento.preventDefault();
    }

    

    const handleChange = (evento) => {
        if (evento.target.name === 'allTemperaments') {            
            var options = evento.target.options;
            var value = [];
            for (var i = 0; i < options.length; i++) {
                if (options[i].selected) {
                    value.push(options[i].value);
                }
            }
            setDogNew({ ...dogNew, [evento.target.name]: value });
            setErrors(validation({ ...dogNew, [evento.target.name]: value }));
        } else {
            setDogNew({ ...dogNew, [evento.target.name]: evento.target.value });
            setErrors(validation({ ...dogNew, [evento.target.name]: evento.target.value }));
        }
    }



    return (
        <div className='containerFP'>
            <div className='containerCrear'>

                <form className='containerForm' onSubmit={handleSubmit} >
                    <Link to={'/Home'} >Volver</Link>
                    <div>
                        <h1>🐾 CREAR DOG🐾</h1>
                        <input name='name' onChange={handleChange} value={dogNew.name} placeholder='Nombre...' type='text' /><br />

                        <label>Altura: </label><br /><span>Min</span>
                        <input className='inputDate' onChange={handleChange} value={dogNew.heightMin} placeholder='Min...' type='text' name='heightMin' /><span> - </span>
                        <input className='inputDate' onChange={handleChange} value={dogNew.heightMax} placeholder='Max...' type='text' name='heightMax' /><br />


                        <label>Peso : </label><br /><span>Min</span>
                        <input className='inputDate' onChange={handleChange} value={dogNew.weightMin} placeholder='Min...' type='text' name='weightMin' /><span> - </span>
                        <input className='inputDate' onChange={handleChange} value={dogNew.weightMax} placeholder='Max...' type='text' name='weightMax' /><br />



                        <label>Años de vida: </label><br /><span>Min</span>
                        <input className='inputDate' onChange={handleChange} value={dogNew.ageMin} placeholder='Min...' type='text' name='ageMin' /><span> - </span>
                        <input className='inputDate' onChange={handleChange} value={dogNew.ageMax} placeholder='Max...' type='text' name='ageMax' /><br />


                        <label>Foto: </label><br />
                        <input onChange={handleChange} value={dogNew.image} placeholder='URL (https//...)...' name='image' type='text' /><br />


                        <label>Temperamentos: Multiple temps (Ctrl + click ) </label><br />
                        <select onChange={handleChange} name='allTemperaments' multiple={true} >
                            {allTemperaments?.map(({ name, id }) => (
                                <option value={name} key={id}>{name}</option>
                            ))}
                        </select><br />


                        <button >🐾 CREAR DOG🐾</button>



                    </div>
                    <div>
                        {errors?.name && <p style={{ color: 'red' }}>{errors.name}</p>}<br />

                        {errors?.heightMin && <p style={{ color: 'red' }}>{errors.heightMin}</p>}
                        {errors?.heightMax && <p style={{ color: 'red' }}>{errors.heightMax}</p>}<br />

                        {errors?.weightMin && <p style={{ color: 'red' }}>{errors.weightMin}</p>}
                        {errors?.weightMax && <p style={{ color: 'red' }}>{errors.weightMax}</p>}<br />

                        {errors?.ageMin && <p style={{ color: 'red' }}>{errors.ageMin}</p>}
                        {errors?.ageMax && <p style={{ color: 'red' }}>{errors.ageMax}</p>}<br />

                        {errors?.image && <p style={{ color: 'red' }}>{errors.image}</p>}<br />

                        {errors?.allTemperaments && <p style={{ color: 'red' }}>{errors.allTemperaments}</p>}<br />

                    </div>




                </form>
            </div>

        </div>
    )
}

export default Form;