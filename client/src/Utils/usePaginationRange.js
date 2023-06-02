import { useMemo } from "react";
export const DOTS = "...";

const rango = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, index) => index + start);
};

export const useFuncionRangoDePaginacion = ({
  totalDePaginas,
  botonesaMostrar,
  botonesHermanos,
  paginaActual,
}) => {
  const rangoDePaginacion = useMemo(() => {
    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    //El recuento de páginas se determina como siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = botonesaMostrar + 2 * botonesHermanos;

    /*
          If the number of pages is less than the page numbers we want to show in our
          paginationComponent, we return the range [1..totalPageCount]

          Si el número de páginas es inferior a los números de página que queremos mostrar en nuestro
          paginationComponent, devolvemos el rango [1..totalPageCount]
        */
    if (totalPageNumbers >= totalDePaginas) {
      return rango(1, totalDePaginas);
    }

    const hermanosIzquierdos = Math.max(paginaActual - botonesHermanos, 1);
    const hermanosDerechos = Math.min(
      paginaActual + botonesHermanos,
      totalDePaginas
    );

    /*
          We do not want to show dots if there is only one position left 
          after/before the left/right page count as that would lead to a change if our Pagination
          component size which we do not want

          No queremos mostrar puntos si solo queda una posición
          después/antes de que la página izquierda/derecha cuente, ya que eso conduciría a un cambio si nuestra Paginación
          tamaño del componente que no queremos
        */
    const mostrarPuntosIzquierdos = hermanosIzquierdos > 2;
    const mostrarPuntosDerechos = hermanosDerechos <= totalDePaginas - 2;

    const indicePrimeraPagina = 1;
    const indiceUltimaPagina = totalDePaginas;

    if (!mostrarPuntosIzquierdos && mostrarPuntosDerechos) {
      let izquierdos = 3 + 2 * botonesHermanos;
      let rangoIzquierdo = rango(1, izquierdos);

      return [...rangoIzquierdo, DOTS, totalDePaginas];
    }

    if (mostrarPuntosIzquierdos && !mostrarPuntosDerechos) {
      let derechos = 3 + 2 * botonesHermanos;
      let rangoDerecho = rango(
        totalDePaginas - derechos + 1,
        totalDePaginas
      );

      return [indicePrimeraPagina, DOTS, ...rangoDerecho];
    }

    if (mostrarPuntosIzquierdos && mostrarPuntosDerechos) {
      let rangoIntermedio = rango(hermanosIzquierdos, hermanosDerechos);
      return [indicePrimeraPagina, DOTS, ...rangoIntermedio, DOTS, indiceUltimaPagina];
    }
  }, [totalDePaginas, botonesHermanos, paginaActual, botonesaMostrar]);

  return rangoDePaginacion;
};
