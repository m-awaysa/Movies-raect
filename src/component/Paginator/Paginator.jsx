import React, { useState, useEffect } from 'react';
import './Paginator.css';
import { Link } from 'react-router-dom'

const Paginator = ({ currentPage, setCurrentPage, totalPages = 1, maxPages = 100 }) => {
  const [start] = useState(1);
  const [end, setEnd] = useState(totalPages);
  let [page, setPage] = useState(currentPage);
  const [done, setDone] = useState(false);

  const endCalc = () => {
    if (totalPages > maxPages) {
      setEnd(maxPages)
    } else {
      setEnd(totalPages)
    }
  }

  const movePage = (newPage) => {
    setCurrentPage(newPage);
    setPage(newPage)
  }

  useEffect(() => {
    endCalc()
    setTimeout(() => {
      setDone(true)
    }, 500);
  }, [currentPage, totalPages]);

  if (totalPages < 2) return <></>;

  return <>
    {done?
      <div className="col-12">
        <ul className="paginator">
          <li onClick={() => movePage(start)} className="paginator__item paginator__item--prev">
            <Link >
              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-chevron-double-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                <path fillRule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
              </svg>
            </Link>
          </li>
          <li onClick={() => movePage(currentPage > start ? currentPage - 1 : end)} className="paginator__item paginator__item--prev">
            <Link >
              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
              </svg>
            </Link>
          </li>
          <li onClick={() => movePage(start)} className={`paginator__item ` + (currentPage === page ? ' paginator__item--active' : '')}><Link href="#">{page}</Link></li>
          <li onClick={() => movePage(currentPage < end ? currentPage + 1 : start)} className="paginator__item paginator__item--next">
            <Link >
              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
              </svg>
            </Link>
          </li>
          <li onClick={() => movePage(end)} className="paginator__item paginator__item--next">
            <Link href="#">
              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-chevron-double-right" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z" />
                <path fillRule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </Link>
          </li>
        </ul>
      </div> : ''}
  </>
};

export default Paginator;