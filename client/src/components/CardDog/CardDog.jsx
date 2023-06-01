import './CardDog.css';
import { Link } from 'react-router-dom';


function CardDog ({ id , image , name , height, weight, temperaments, age }){
   
    return(
        <div className='containerDog'>
            <Link to={`/detail/${id}`}><h6>Nombre:{name}</h6><br/></Link>
            <img  src={ image } alt={ name } className='image'/><br/>
            <label>Temperamentos: { temperaments }</label><br/>
            <label>Peso: { weight }</label>
        </div>
    )
}

export default CardDog