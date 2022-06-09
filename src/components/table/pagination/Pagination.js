import { useState } from 'react';
import classes from './Pagination.module.css';

const Pagination = ({ charactersPerPage, totalCharacters, paginate }) => {
  const [currPage, setCurrentPage] = useState(0);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalCharacters / charactersPerPage); i++) {
    pageNumbers.push(i);
  }

  const changePagePlusOne = () => {
    setCurrentPage(currPage + 1);
    console.log(currPage);
    if (currPage === -1) {
      setCurrentPage(currPage + 2);
      paginate(pageNumbers[currPage + 2]);
      return;
    }
    if (currPage > pageNumbers.length - 3) {
      setCurrentPage(0);
      paginate(pageNumbers[0]);
      return;
    }

    paginate(pageNumbers[currPage + 1]);
  };

  const changePageMinusOne = () => {
    console.log(currPage);
    setCurrentPage(currPage - 1);
    if (currPage < 0) {
      setCurrentPage(0);
      return;
    }
    paginate(pageNumbers[currPage]);
  };

  const switchPage = (e) => {
    console.log(e.target.innerText);
    setCurrentPage(+e.target.innerText - 1);
    paginate(pageNumbers[+e.target.innerText - 1]);
  };
  const show = pageNumbers.length > 7;

  return (
    <nav className={classes.nav}>
      {show && (
        <ul className={classes.ul}>
          <li>
            <a onClick={changePageMinusOne} href="!#">
              {'<'}
            </a>
          </li>

          {currPage > pageNumbers.length - 5 ? (
            <li>
              <a onClick={switchPage} href="!#">
                {pageNumbers.length - 5}
              </a>
            </li>
          ) : (
            <li>
              <a onClick={switchPage} href="!#">
                {currPage === -1 || currPage === 0 ? 1 : currPage + 1}
              </a>
            </li>
          )}

          {currPage > pageNumbers.length - 5 ? (
            <li>
              <a onClick={switchPage} href="!#">
                {pageNumbers.length - 4}
              </a>
            </li>
          ) : (
            <li>
              <a onClick={switchPage} href="!#">
                {currPage === -1 || currPage === 0 ? 2 : currPage + 2}
              </a>
            </li>
          )}

          {currPage > pageNumbers.length - 5 ? (
            <li>
              <a onClick={switchPage} href="!#">
                {pageNumbers.length - 3}
              </a>
            </li>
          ) : (
            <li>
              <a onClick={switchPage} href="!#">
                {currPage === -1 || currPage === 0 ? 3 : currPage + 3}
              </a>
            </li>
          )}
          <p>...</p>

          <li>
            <a onClick={switchPage} href="!#">
              {pageNumbers.length - 2}
            </a>
          </li>

          <li>
            <a onClick={switchPage} href="!#">
              {pageNumbers.length - 1}
            </a>
          </li>

          <li>
            <a onClick={switchPage} href="!#">
              {pageNumbers.length}
            </a>
          </li>

          <li>
            <a onClick={changePagePlusOne} href="!#">
              {'>'}
            </a>
          </li>
        </ul>
      )}

      {!show && (
        <ul className={classes.ul}>
          {pageNumbers.map((number) => (
            <li key={number}>
              <a onClick={() => paginate(number)} href="!#">
                {number}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};
export default Pagination;
