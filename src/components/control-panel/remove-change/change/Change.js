import { useState } from 'react';

import OptionElement from './OptionElement';

import classes from '../remove-change-btn.module.css';
import style from './change.module.css';

const Change = ({ length, characterStatus, setNewStatus }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [optionList, setOptionList] = useState([]);

  const showOptionsHandler = () => {
    if (characterStatus === 'Alive') setOptionList(() => ['Dead']);
    if (characterStatus === 'Dead') setOptionList(() => ['You are not a God :)']);
    if (characterStatus === 'unknown') setOptionList(() => ['Dead', 'Alive']);
    setShowOptions(!showOptions);
  };

  const closeOptionsHandler = () => {
    setShowOptions(false);
  };
  return (
    <div>
      <button
        onClick={showOptionsHandler}
        disabled={length !== 1}
        className={`${classes.btn} ${classes.change}`}
      >
        <i className="bi bi-pencil-square"></i>
        <p>Change status</p>
      </button>
      {showOptions && (
        <ul className={style.list} onMouseLeave={closeOptionsHandler}>
          {optionList.map((el, index) => (
            <OptionElement
              key={index}
              option={el}
              closeOptions={closeOptionsHandler}
              setNewStatus={setNewStatus}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Change;
