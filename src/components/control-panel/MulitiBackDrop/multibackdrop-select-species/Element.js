import { useState, useEffect } from 'react';
import classes from '../Element.module.css';

const Element = ({ locationName, addElement, deleteElement, arrOfChoosen }) => {
  const [tick, setTick] = useState(false);
  useEffect(() => {
    arrOfChoosen.includes(locationName) && setTick(true);
  }, [arrOfChoosen, locationName]);
  const toogle = tick ? <i className="bi bi-toggle-on"></i> : <i className="bi bi-toggle-off"></i>;

  const tickHandler = (e) => {
    e.preventDefault();
    setTick(!tick);

    !tick && addElement(e.target.innerText);
    tick && deleteElement(e.target.innerText);
  };

  return (
    <li className={`${classes.li} ${tick ? classes.tick : ''}`} onClick={tickHandler}>
      {toogle}
      {locationName}
    </li>
  );
};

export default Element;
