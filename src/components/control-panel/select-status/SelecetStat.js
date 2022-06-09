import { useState } from 'react';
import Element from './Element';
import classes from './SelectStat.module.css';

const STATUS_OPTIONS = ['Alive', 'Dead', 'Unknown', 'All'];

const SelectStat = ({ selectStatus }) => {
  const [showList, setShowList] = useState(false);
  const [choosenStatus, setChoosenStatus] = useState('All');

  const showListToggleHandler = (e) => {
    e.preventDefault();
    setShowList(!showList);
  };
  const closeListHandler = () => {
    setTimeout(() => {
      setShowList(false);
    }, 200);
  };

  const setChoosenStatusHandler = (status) => {
    setChoosenStatus(() => status);
  };

  const arrow = showList ? (
    <i className="bi bi-caret-up-fill"></i>
  ) : (
    <i className="bi bi-caret-down-fill"></i>
  );

  return (
    <div>
      <button onClick={showListToggleHandler} className={classes.btnOpen}>
        <p>{choosenStatus !== 'All' ? choosenStatus : 'Status'}</p>
        {arrow}
      </button>
      {showList && (
        <ul onMouseLeave={showListToggleHandler} className={classes.list}>
          {STATUS_OPTIONS.map((el, index) => (
            <Element
              key={index}
              status={el}
              setChoosenStatus={setChoosenStatusHandler}
              closeList={closeListHandler}
              selectStatus={selectStatus}
              choosenStatus={choosenStatus}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectStat;
