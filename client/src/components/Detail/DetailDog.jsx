import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import './DetailDog.css';
//Representa el componete del despliegue de un dog en especifico 
const DetailDog = () => {
    const { id } = useParams();
    //estado local que guerda el dog a mostrar 
    const [dog, setDog] = useState({});

    useEffect(() => {
        async function fetData() {
            try {
                const { data: dogDetail } = await axios(`http://localhost:3001/dogs/${id}`)
                if (dogDetail.name) {               
                    setDog(dogDetail);
                }
            } catch (error) {
                alert(error.message);
            }
        }
        fetData();
    }, [id]);




    return (
        <div className="containerDetailDog">

            <div className="divInfo">
                <h2>ID : {dog.id}</h2>
                <h2>Nombre :</h2> <span>{dog?.name}</span>
                <h2>Altura : </h2> <span>{dog?.height}</span>
                <h2>Peso :</h2> <span> {dog?.weight}</span>
                <h2>Temperamentos : </h2><p className="mensajeTemperamentos">{ dog.alltemperaments}</p>
                <h2>Años de vida :</h2> <span> {dog?.age}</span>

            </div>

            <div className="divImage">
                <img className="imageDetail" src={dog?.image} alt={dog?.image} />
            </div>


        </div>
    )

}
export default DetailDog;