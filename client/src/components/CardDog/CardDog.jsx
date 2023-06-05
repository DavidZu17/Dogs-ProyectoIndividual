import './CardDog.css';
import { Link } from 'react-router-dom';
import imageDefault from '../../images/dogDefault.png';
// 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJKmJWxnjoiFPHoF2nL0pmPDgfnHDdNlCOoA&usqp=CAU'

//Componente que representa la Card de Dog , muestra una info basica del DOg
function CardDog({ id, image, name, height, weight, temperaments, age }) {

    return (
        <div className='containerDog'>
            <div className='containerUp'>
                <Link to={`/detail/${id}`}> <h3>{name}</h3></Link>
                {/** Se carga la imagen que contenga el dog o si no se subio una imagen se coloca una por defecto para tener una img en la card */}
                <img  src={image === '' ? imageDefault : image } alt={name} className='image' />
            </div>
            
            <div className='containerDown'>
                <h4>Temperamentos: </h4> <p>{temperaments}</p>
                <h4>Peso:</h4><p>{weight}</p>
            </div>


        </div>
    )
}

export default CardDog