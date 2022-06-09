import { useState } from 'react';
import classes from './Element.module.css';

const Element = ({ status, setChoosenStatus, choosenStatus, closeList, selectStatus }) => {
  const [tick, setTick] = useState(false);

  const tickHandler = (e) => {
    e.preventDefault();
    setChoosenStatus(e.target.innerText);
    selectStatus(e.target.innerText);
    setTick(!tick);
    closeList();
  };

  return (
    <li
      className={`${classes.li} ${choosenStatus === status ? classes.tick : ''}`}
      onClick={tickHandler}
    >
      {status}
    </li>
  );
};

export default Element;
