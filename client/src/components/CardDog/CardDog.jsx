import './CardDog.css';
import { Link } from 'react-router-dom';


function CardDog ({ id , image , name , height, weight, temperaments, age } ){
 
    return(
        <div className='containerDog'>
            <Link to={`/detail/${id}`}> <h2>{name}</h2></Link><br/>
            <img  src={ image } alt={ name } className='image'/><br/>
            <h4>Temperamentos: </h4> <label>{ temperaments }</label><br/>
            <h4>Peso:</h4><label> { weight }</label>
        </div>
    )
}

export default CardDog