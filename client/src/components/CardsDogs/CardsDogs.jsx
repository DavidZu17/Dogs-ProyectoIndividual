import './CardsDogs.css';
import CardDog from '../CardDog/CardDog';


function CardsDogs({ dogs }) {    
    
    return (
        <div className='containerCardsDogs'>
            <h1>Cards</h1>
            {                
                dogs?.map((Dog) => { 
                    return (                        
                        <CardDog
                            key={Dog.id}
                            id={Dog.id}
                            image={Dog.image}
                            name={Dog.name}
                            height={Dog.height}
                            weight={Dog.weight}
                            temperaments={ Dog.alltemperaments }
                            age={Dog.age}  
                        />
                    );
                })}
        </div>
    );
}

export default CardsDogs;