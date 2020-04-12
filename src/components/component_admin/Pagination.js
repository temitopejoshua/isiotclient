import React from 'react';
import './pagination.css'


const Pagination = ({objectsPerPage, totalObjects, paginate, firstIndex, lastIndex}) =>{
    const pageNumber = [];

    for(let row = 1; row<= Math.ceil(totalObjects/objectsPerPage); row++){
        pageNumber.push(row);
    }

    return (
        <div className="row">
            <div >
            <div aria-live="polite" className="">Showing {firstIndex} to {lastIndex} of {totalObjects} entries</div>
            </div>
            <div className="table-paginate">
            <nav>
            <ul className="pagination">
               {pageNumber.map(number => (
                   <li key={number} className="page-item">
                       <a onClick={() => paginate(number)} href="#" className="page-link">
                           {number}
                        </a>
                   </li>
               ))}
            </ul>
            </nav>
            </div>
        </div>
    )
}

export default Pagination