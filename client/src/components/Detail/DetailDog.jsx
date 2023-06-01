import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import './DetailDog.css';

const DetailDog = () => {
    const { id } = useParams();
    const [dog, setDog] = useState({});

    const listTem = (temperaments) => {
        let listTemp = '';
        temperaments.forEach((tem) => {
            listTemp += `${tem.name},`;
        })
        return listTem;
    }



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

            <div>
                <h2>ID :</h2><span><p>{dog.id}</p></span>
                <h2>Nombre :</h2> <span><p> {dog?.name}</p></span>
                <h2>Altura : </h2> <span><p>{dog?.height}</p></span>
                <h2>Peso :</h2> <span><p> {dog?.weight}</p></span>
                <h2>Temperamentos : </h2> <span><p>{ dog.alltemperaments}</p></span>
                <h2>Años de vida :</h2> <span><p> {dog?.age}</p></span>

            </div>

            <div>
                <img src={dog?.image} alt={dog?.image} />
            </div>


        </div>
    )

}
export default DetailDog;