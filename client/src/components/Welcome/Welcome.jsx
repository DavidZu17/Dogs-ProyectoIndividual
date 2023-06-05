import { Link, useNavigate } from 'react-router-dom';
import './Welcome.css';

//Componente que solo muestra una bienvenida al iniciar al app
function Welcome (){
    
    return(
        <div className='containerWelcome'>  
            <Link to={'/Home'} className='linkWelcome'>Welcome <br/> WORLD DOGS</Link> 
            
        </div>
    );
}

export default Welcome ;