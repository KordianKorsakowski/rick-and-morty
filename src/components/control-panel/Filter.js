import MultiBackdropLocation from './MulitiBackDrop/mutlibackdrop-select-location/MultiBackdropLocation';
import Name from './name/Name';
import classes from './Filter.module.css';
import MultiBackdropSpecies from './MulitiBackDrop//multibackdrop-select-species/MultiBackdropSpecies';
import SelectStat from './select-status/SelecetStat';

const Filter = ({
  filterByName,
  filterByLocation,
  filterBySpecies,
  selectStatus,
  allLocationName,
  allSpecies,
}) => {
  return (
    <form className={classes.form}>
      <Name filterByName={filterByName} />
      <SelectStat selectStatus={selectStatus} />
      <MultiBackdropLocation
        allLocationName={allLocationName}
        filterByLocation={filterByLocation}
      />
      <MultiBackdropSpecies allSpecies={allSpecies} filterBySpecies={filterBySpecies} />
    </form>
  );
};

export default Filter;
