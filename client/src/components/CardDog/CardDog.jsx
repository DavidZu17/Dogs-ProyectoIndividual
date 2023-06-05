import './CardDog.css';
import { Link } from 'react-router-dom';
import imageDefault from '../../images/dogDefault.png';
// 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJKmJWxnjoiFPHoF2nL0pmPDgfnHDdNlCOoA&usqp=CAU'


function CardDog({ id, image, name, height, weight, temperaments, age }) {

    return (
        <div className='containerDog'>
            <div className='containerUp'>
                <Link to={`/detail/${id}`}> <h3>{name}</h3></Link>
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