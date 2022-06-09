import { useState, useEffect } from 'react';

import classes from './Character.module.css';
import Origin from './origin/Origin';
import RandomEpisode from './random-episode/RandomEpisode';
import Location from './location/Location';

const Character = ({
  name,
  status,
  id,
  image,
  species,
  episode,
  origin,
  location,
  selectedCharacters,
  reset,
}) => {
  const [showLocation, setShowLocation] = useState(false);
  const [selectedCharacter, setSelectedCharater] = useState(false);

  let showIcon;

  useEffect(() => {
    if (reset) setSelectedCharater(false);
  }, [reset]);

  const toogleShowLocation = () => {
    setShowLocation(!showLocation);
  };
  const closeShowLocation = () => {
    setShowLocation(false);
  };

  const selectCharacter = () => {
    setSelectedCharater(!selectedCharacter);
    selectedCharacters(id, status);
  };

  const check = selectedCharacter ? (
    <i className="bi bi-check2-square"></i>
  ) : (
    <i className="bi bi-app"></i>
  );

  if (status === 'Alive')
    showIcon = <i className="bi bi-check-circle" style={{ color: 'green' }}></i>;
  if (status === 'Dead')
    showIcon = <i className="bi bi-exclamation-circle" style={{ color: 'red' }}></i>;
  if (status === 'unknown')
    showIcon = (
      <i className="bi bi-question-circle-fill" style={{ color: 'rgb(177, 177, 177)' }}></i>
    );

  return (
    <li
      onClick={() => {
        selectCharacter();
        toogleShowLocation();
      }}
      onMouseLeave={closeShowLocation}
      style={{ backgroundColor: `${status === 'Dead' ? '#EFEFEF' : ''}` }}
      className={`${classes.element} ${selectedCharacter ? classes.selected : ''}`}
    >
      {check}
      <div className={classes.containerName}>
        <p className={classes.bold}>{name}</p>
        <p>{species}</p>
      </div>
      <div className={classes.containerImg}>
        <img src={image} alt="new" className={classes.img} />
      </div>
      {showLocation && <Location url={location.url} name={location.name} />}
      <div className={classes.containerOrigin}>
        <Origin url={origin.url} name={origin.name} />
      </div>
      <div className={classes.containerOrigin}>
        <RandomEpisode episode={episode} />
      </div>
      <div className={`${classes.containerAlive} ${status === 'unknown' ? classes.colorInfo : ''}`}>
        <p>{showIcon}</p>
        <p className={classes.bold}>{status}</p>
      </div>
    </li>
  );
};

export default Character;
