import './CardsDogs.css';
import CardDog from '../CardDog/CardDog';
import { useState, useEffect } from 'react';
import { useFuncionRangoDePaginacion , DOTS } from '../../Utils/usePaginationRange';




function CardsDogs({
    dogs,
    title,
    botonesaMostrar,
    cantidadPorPagina,
    botonesHermanos,
}) {

    const [paginaActual, setPaginaActual] = useState(1);
    let  totalDePaginas = Math.ceil((dogs.length) / cantidadPorPagina );

    let rangoDePaginacion = useFuncionRangoDePaginacion({
        totalDePaginas ,
        botonesaMostrar,
        botonesHermanos,
        paginaActual,
    });

    useEffect(() => {
        window.scrollTo({
            behavior: "smooth",
            top: "0px",
        });
        
    }, [ paginaActual ]);

    function siguientePagina() {
        setPaginaActual((page) => page + 1);
    }
    function anteriorPagina() {
        setPaginaActual((page) => page - 1);
    }
    function changePage(event) {
        const pageNumber = Number(event.target.textContent);
        setPaginaActual(pageNumber);
    }
    const dogsPaginaActual = () => {
        const indiceInicio = paginaActual * cantidadPorPagina - cantidadPorPagina;
        const inidceFin = indiceInicio + cantidadPorPagina;
        return dogs.slice(indiceInicio, inidceFin);
    };

    return (
        <div className='containerAll'>
            <div><h3>{title}</h3></div>
            {/*Se muestran 8 perros en la pagina de todo los que se cargaron*/}
            <div className="containerCardsDogs">
                {dogsPaginaActual().map(( dog ) => (
                    <CardDog key={dog.id} id={dog.id} image={dog.image} name={dog.name} height={dog.height} weight={dog.weight} temperaments={dog.alltemperaments} age={dog.age} />
                ))}
            </div>
            {/* Se muestran los botones correspondientes, por defecto 5
                el anterior , el siguiente y los botones primero , actual y
                ultimo y su grupo de botones con o sin DOTS */}
            <div className="pagination">
                {/* Boton Anterior */}
                <button
                    onClick={ anteriorPagina }
                    className={` prev ${ paginaActual === 1 ? "disabled" : ""}`}
                >
                    Anterior
                </button>
                {/* Se muestra el grupo correspondiente de nums o DOTS segun el boton/pagina que se encuentre
                */}
                {                    
                rangoDePaginacion.map((item, index) => {
                    if (item === DOTS) {
                        return (
                            <button key={index} className={`paginationItem`}>
                                {DOTS}
                            </button>
                        );
                    }
                    return (
                        <button
                            key={index}
                            onClick={changePage}
                            className={`paginationItem ${paginaActual === item ? "active" : null
                                }`}
                        >
                            <span>{item}</span>
                        </button>
                    );
                })}
                {/* Boton siguiente */}
                <button
                    onClick={siguientePagina}
                    className={`next ${paginaActual === totalDePaginas ? "disabled" : ""}`}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );

}

export default CardsDogs;