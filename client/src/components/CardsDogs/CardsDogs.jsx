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

    const [totalDePaginas] = useState(Math.ceil(dogs.length / cantidadPorPagina));
    const [paginaActual, setPaginaActual] = useState(1);

    const rangoDePaginacion = useFuncionRangoDePaginacion({
        totalDePaginas: totalDePaginas,
        botonesaMostrar,
        botonesHermanos,
        paginaActual: paginaActual,
    });

    useEffect(() => {
        window.scrollTo({
            behavior: "smooth",
            top: "0px",
        });
    }, [paginaActual]);

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
            <div><h1>{title}</h1></div>
            {/*Se muestran 8 perros en la pagina de todo los que se cargaron*/}
            <div className="containerCardsDogs">
                {dogsPaginaActual().map(( dog ) => (
                    <CardDog key={dog.id} id={dog.id} image={dog.image} name={dog.name} height={dog.height} weight={dog.weight} temperaments={dog.alltemperaments} age={dog.age} />
                ))}
            </div>
            {/* show the pagiantion
                it consists of next and previous buttons
                along with page numbers, in our case, 5 page
                numbers at a time */}
            <div className="pagination">
                {/* previous button */}
                <button
                    onClick={ anteriorPagina }
                    className={` prev ${ paginaActual === 1 ? "disabled" : ""}`}
                >
                    Anterior
                </button>
                {/* show paginated button group */}
                {rangoDePaginacion.map((item, index) => {
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
                {/* next button */}
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