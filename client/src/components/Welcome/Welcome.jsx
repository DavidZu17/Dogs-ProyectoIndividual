import { Link } from 'react-router-dom';
import './Welcome.css';

function Welcome (){
    return(
        <div className='containerWelcome'>  
            <h1>Soy Welcome</h1>
            <Link to={'/Home'}>Home</Link>  
            
        </div>
    );
}

export default Welcome ;