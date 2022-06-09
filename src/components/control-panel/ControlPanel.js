import Filter from './Filter';
import RemoveAndChange from './remove-change/RemoveAndChange';

import classes from './control-panel.module.css';

const ControlPanel = ({
  filterByName,
  filterByLocation,
  filterBySpecies,
  selectStatus,
  setNewStatus,
  allLocationName,
  allSpecies,
  allSelectedCharacters,
  showModal,
  characterStatus,
}) => {
  return (
    <div className={classes.container}>
      <Filter
        filterByName={filterByName}
        filterByLocation={filterByLocation}
        filterBySpecies={filterBySpecies}
        selectStatus={selectStatus}
        allLocationName={allLocationName}
        allSpecies={allSpecies}
      />
      <RemoveAndChange
        allSelectedCharacters={allSelectedCharacters}
        showModal={showModal}
        characterStatus={characterStatus}
        setNewStatus={setNewStatus}
      />
    </div>
  );
};

export default ControlPanel;
