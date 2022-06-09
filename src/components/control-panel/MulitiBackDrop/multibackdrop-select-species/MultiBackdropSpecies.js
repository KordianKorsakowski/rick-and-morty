import { useState, useEffect } from 'react';
import Element from './Element';
import classes from '../MultiBackdrop.module.css';

const MultiBackdropSpecies = ({ allSpecies, filterBySpecies }) => {
  const [showList, setShowList] = useState(false);
  const [arrOfChoosen, setArrOfChoosen] = useState([]);

  useEffect(() => {
    filterBySpecies(arrOfChoosen);
  }, [arrOfChoosen, filterBySpecies]);

  const addElementHandler = (element) => {
    setArrOfChoosen((prev) => [...prev, element]);
  };
  const deleteElementHandler = (element) => {
    const arr = arrOfChoosen.filter((el) => el !== element);
    setArrOfChoosen(() => [...arr]);
  };

  const showListToggleHandler = (e) => {
    e.preventDefault();
    setShowList(!showList);
  };

  const arrow = showList ? (
    <i className="bi bi-caret-up-fill"></i>
  ) : (
    <i className="bi bi-caret-down-fill"></i>
  );

  return (
    <div>
      <button onClick={showListToggleHandler} className={classes.btnOpen}>
        <p>
          {arrOfChoosen.length === 0 ? 'Species' : `You choosen: ${arrOfChoosen.length} species`}
        </p>
        {arrow}
      </button>
      {showList && (
        <ul onMouseLeave={showListToggleHandler} className={classes.list}>
          {[...new Set(allSpecies)].map((el, index) => (
            <Element
              key={index}
              locationName={el}
              addElement={addElementHandler}
              deleteElement={deleteElementHandler}
              arrOfChoosen={arrOfChoosen}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiBackdropSpecies;
