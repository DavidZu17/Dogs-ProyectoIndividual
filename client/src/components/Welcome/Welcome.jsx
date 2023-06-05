import { Link, useNavigate } from 'react-router-dom';
import './Welcome.css';


function Welcome (){
    
    return(
        <div className='containerWelcome'>  
            <Link to={'/Home'} className='linkWelcome'>Welcome <br/> WORLD DOGS</Link> 
            
        </div>
    );
}

export default Welcome ;