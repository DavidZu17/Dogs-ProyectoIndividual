import './CardsDogs.css';
import CardDog from '../CardDog/CardDog';
import { useState, useEffect } from 'react';
import { usePaginationRange, DOTS } from '../../Utils/usePaginationRange';

function CardsDogs({
    data,
    buttonConst,
    contentPerPage,
    siblingCount,
  }) {

    const [totalPageCount] = useState(Math.ceil(data.length / contentPerPage));
    const [currentPage, setCurrentPage] = useState(1);
  
    const paginationRange = usePaginationRange({
      totalPageCount,
      contentPerPage,
      buttonConst,
      siblingCount,
      currentPage,
    });
  
    useEffect(() => {
      window.scrollTo({
        behavior: "smooth",
        top: "0px",
      });
    }, [currentPage]);
  
    function goToNextPage() {
      setCurrentPage((page) => page + 1);
    }
    function gotToPreviousPage() {
      setCurrentPage((page) => page - 1);
    }
    function changePage(event) {
      const pageNumber = Number(event.target.textContent);
      setCurrentPage(pageNumber);
    }
    const getPaginatedData = () => {
      const startIndex = currentPage * contentPerPage - contentPerPage;
      const endIndex = startIndex + contentPerPage;
      return data.slice(startIndex, endIndex);
    };

    return (
        <div>
         
          {/* show the post 10 post at a time*/}
          <div className="dataContainer">
            {getPaginatedData().map((dog, index) => (
              <CardDog key={index} id={dog.id} image={dog.image} name={dog.name} height={dog.height} weight={dog.weight} temperaments={dog.alltemperaments} age={dog.age} />
            ))}
          </div>
          {/* show the pagiantion
                    it consists of next and previous buttons
                    along with page numbers, in our case, 5 page
                    numbers at a time */}
          <div className="pagination">
            {/* previous button */}
            <button
              onClick={gotToPreviousPage}
              className={` prev ${currentPage === 1 ? "disabled" : ""}`}
            >
              previous
            </button>
            {/* show paginated button group */}
            {paginationRange.map((item, index) => {
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
                  className={`paginationItem ${
                    currentPage === item ? "active" : null
                  }`}
                >
                  <span>{item}</span>
                </button>
              );
            })}
            {/* next button */}
            <button
              onClick={goToNextPage}
              className={`next ${currentPage === totalPageCount ? "disabled" : ""}`}
            >
              next
            </button>
          </div>
        </div>
      );



    // return (
    //     <div className='containerCardsDogs'>
    //         <h1>Cards</h1>
    //         {
    //             dogs?.map((Dog) => {
    //                 return (
    //                     <CardDog
    //                         key={Dog.id}
    //                         id={Dog.id}
    //                         image={Dog.image}
    //                         name={Dog.name}
    //                         height={Dog.height}
    //                         weight={Dog.weight}
    //                         temperaments={Dog.alltemperaments}
    //                         age={Dog.age}
    //                     />
    //                 );
    //             })}
    //     </div>
    // );
}

export default CardsDogs;