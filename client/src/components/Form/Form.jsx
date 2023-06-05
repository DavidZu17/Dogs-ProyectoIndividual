import './Form.css';
import { useState } from 'react';
import validation from '../Validation/Validation';
import { useDispatch } from 'react-redux';
import { submitDog } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import imageForm from '../../images/ojitosForm.png';



//Componente encargado del formulario de crear un dog nuevo
const Form = ({ allTemperaments }) => {
    //Estados de dognew a agregar y si hay errores en simultaneo
    const [dogNew, setDogNew] = useState({ name: '', heightMin: '', heightMax: '', weightMin: '', weightMax: '', ageMin: '', ageMax: '', image: '', allTemperaments: [] });
    const [errors, setErrors] = useState({ name: '', heightMin: '', heightMax: '', weightMin: '', weightMax: '', ageMin: '', ageMax: '', image: '', allTemperaments: [] });

    const dispatch = useDispatch();
    const navigate = useNavigate();


//funcion que se encarga de subir y crear el dog nuevo a la base de datos
    const handleSubmit = (evento) => {
        //Si no hay errores lo crea 
        if (Object.keys(errors).length === 0) {
            //Se convierte en string los temperamentos que agrega el usuario en el Select del formulario
            let stringTemperaments = dogNew.allTemperaments.toString();
            //Se crea objeto nuevo con los atributos correspondientes para el anvio  ala BD
            const dogDispa = {
                name: dogNew.name,
                height: dogNew.heightMax.length !== 0 ? `${dogNew.heightMin} - ${dogNew.heightMax}` : `${dogNew.heightMin}`,
                weight: dogNew.weightMax.length !== 0 ? `${dogNew.weightMin} - ${dogNew.weightMax}` : `${dogNew.weightMin}`,
                age: dogNew.ageMax.length !== 0 ? `${dogNew.ageMin} - ${dogNew.ageMax}` : `${dogNew.ageMin}`,
                image: dogNew.image,
                temperaments: stringTemperaments
            }
            //Se intenta despachar la funcion de agregar a la bd y si es satisfactorio se redirije a la pagina principal si no muestra el error correspondiente
            try {
                dispatch(submitDog(dogDispa));
                alert(`Se agrego el Dog : ${dogNew.name} de manera correcta`)
                navigate('/Home');
            } catch (error) {
                alert(`No se pudo agregar el Dog: ${dogNew.name}, Error: ${error.message}`)
            }


        } else {
            alert('Debe de llenar todos los campos para ingresar');
        }
        evento.preventDefault();
    }

   
// funcion que se  encarga de filtrar todos los dogs desplegados en pantalla segun el temperamento seleccionado
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
//funcion que muestra de manera ordenada los errores en el formulario si los hay , uno por uno hasta que se solicionen todos
// y poder habilitar la accion del boton crear dog
    const mostrarError = (errors) => {
        if (errors.name)
            return errors.name

        if (errors.heightMin)
            return errors.heightMin
        if (errors.heightMax)
            return errors.heightMax

        if (errors.weightMin)
            return errors.weightMin
        if (errors.weightMax)
            return errors.weightMax

        if (errors.ageMin)
            return errors.ageMin
        if (errors.ageMax)
            return errors.ageMax

        if (errors.image)
            return errors.image

        if (errors.allTemperaments)
            return errors.allTemperaments

    }
//accion que devuelve a la pagina principal
    const handleButonVolver = () => {
        navigate('/Home');
    }


    return (
        <div className='containerFP'>
            <div className='containerCrear'>

                <form className='containerForm' onSubmit={handleSubmit} >
                    <button className='botonVolver' onClick={handleButonVolver}></button>
                    <div>
                        <div className='divTitulo'>
                            <h1 >¡ CREAR DOG ! </h1>
                        </div>
                        <div className='divNombre'>
                            <label className='labelForm'>Nombre: </label>
                            <input name='name' className='inputFotoAndNname' onChange={handleChange} value={dogNew.name} placeholder='Nombre...' type='text' /><br />
                        </div>

                        <div className='divAltura'>
                            <label className='labelForm'>Altura: </label>
                            <div className='divDosAltura'>
                                <input className='inputDate' onChange={handleChange} value={dogNew.heightMin} placeholder='Min...' type='text' name='heightMin' /><span> - </span>
                                <input className='inputDate' onChange={handleChange} value={dogNew.heightMax} placeholder='Max...' type='text' name='heightMax' /><br />
                            </div>                           
                        </div>

                        <div className='divPeso'>
                            <label className='labelForm'>Peso:</label>
                            <div className='divDosPeso'>
                                <input className='inputDate' onChange={handleChange} value={dogNew.weightMin} placeholder='Min...' type='text' name='weightMin' /><span> - </span>
                                <input className='inputDate' onChange={handleChange} value={dogNew.weightMax} placeholder='Max...' type='text' name='weightMax' /><br />
                            </div>
                        </div>

                        <div className='divAños'>
                            <label className='labelFormAños'>Años de vida: </label>
                            <div className='divDosAños'>
                                <input className='inputDate' onChange={handleChange} value={dogNew.ageMin} placeholder='Min...' type='text' name='ageMin' /><span> - </span>
                                <input className='inputDate' onChange={handleChange} value={dogNew.ageMax} placeholder='Max...' type='text' name='ageMax' /><br />
                            </div>
                        </div>



                        <div className='divFoto'>
                            <label className='labelForm'>Foto: </label>
                            <div className='divDosFoto'>
                                <input className='inputFotoAndNname' onChange={handleChange} value={dogNew.image} placeholder='https://...' name='image' type='text' /><br />

                            </div>
                        </div>


                        <div className='divTemperamentos'>
                            <label className='labelForm'>Temperamentos: <br /> <p className='pMensajes'>Multiple temps (Ctrl + click )</p> </label><br />
                            <select onChange={handleChange} name='allTemperaments' className='selectAllTemperaments' multiple={true} >
                                {allTemperaments?.map(({ name, id }) => (
                                    <option value={name} key={id}>{name}</option>
                                ))}
                            </select>
                        </div>

                        <div className='divBotonCrearDog'>
                            {<p className='pMensajesError' >{errors ? mostrarError(errors) : ''}</p>}
                            <button className='botonCrearDog' name='botonCrearDog' disabled={mostrarError(errors) ? true : false}>¡ CREAR DOG !</button><br />
                        </div>
                    </div>
                </form>
                <img src={imageForm} name='imageForm' className='imageForm' />
            </div>

        </div>
    )
}

export default Form;