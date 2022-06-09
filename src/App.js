import { useEffect, useState } from 'react';

import List from './components/table/list/List';
import Pagination from './components/table/pagination/Pagination';
import ConfirmRemove from './components/modal/ConfirmRemove';
import axios from 'axios';

import classes from './App.module.css';
import ControlPanel from './components/control-panel/ControlPanel';

function App() {
  //-------- filter data-------
  const [name, setName] = useState('');
  const [status, setStatus] = useState(null);
  const [location, setLocation] = useState([]);
  const [species, setSpecies] = useState([]);

  //--------- logic fetch alll data ------
  const [allLocationName, setAllLocationName] = useState([]);
  const [allSpecies, setAllSpecies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [fetch, setFetch] = useState(false);

  //------ pagination ------
  const [currentPage, setCurrentPage] = useState(1);
  const [charactersPerPage] = useState(5);

  // ----- selected cahracters ----
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [selctedCharacterStatus, setSelectedCharacterStatus] = useState();
  // ----- show modal -----
  const [show, setShow] = useState(false);
  //reset
  const [reset, setReset] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (fetch) {
        setLoading(true);
        try {
          const res = await axios.get('https://rickandmortyapi.com/api/character');
          const pages = res.data.info.pages;

          for (let i = 1; i <= pages; i++) {
            const res = await axios.get(`https://rickandmortyapi.com/api/character/?page=${i}`);
            const charactersOnOnePage = res.data.results;
            setData((prev) => [...prev, ...charactersOnOnePage]);
            for (const element of charactersOnOnePage) {
              setAllSpecies((prev) => [...prev, element.species]);
            }
          }

          const resLocatiaon = await axios.get('https://rickandmortyapi.com/api/location');
          const allLocationPages = resLocatiaon.data.info.pages;

          for (let i = 1; i < allLocationPages; i++) {
            const res = await axios(`https://rickandmortyapi.com/api/location/?page=${i}`);
            const locationOnOnePage = res.data.results;
            for (const el of locationOnOnePage) {
              setAllLocationName((prev) => [...prev, el.name]);
            }
          }

          setLoading(false);
        } catch (e) {
          console.log(e);
        }
      }
      return;
    };
    fetchData();
    setFetch(true);

    return () => {};
  }, [fetch]);
  //***********--------set elelements on pages--------------********************

  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  let currentCharacters;
  let totalCharacters;

  if (!name && !status && !location.length && !species.length) {
    currentCharacters = data.slice(indexOfFirstCharacter, indexOfLastCharacter);
    totalCharacters = data.length;
  }

  //change page

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // *************------filter--------************************************************

  const filterByNameHandler = (nameInput) => {
    setName(() => nameInput);
  };

  const selectStatusHandler = (statusInput) => {
    setStatus(statusInput);
  };

  const filterByLocationHandler = (locationInput) => {
    setLocation(() => locationInput);
  };
  const filterBySpeciesHandler = (speciesInput) => {
    setSpecies(() => speciesInput);
  };

  if (name || status || location.length || species.length) {
    let filterData = data;
    if (name) {
      filterData = filterData.filter((el) => el.name.toUpperCase().includes(name.toUpperCase()));
    }
    if (status) {
      if (status === 'Unknown') setStatus('unknown');
      filterData = filterData.filter((el) => el.status === status);
    }
    if (location.length !== 0) {
      let locationData = [];
      for (const element of location) {
        const partOfLocationData = filterData.filter((el) => el.origin.name === element);
        locationData.push(...partOfLocationData);
      }
      filterData = locationData;
    }

    if (species.length !== 0) {
      let speciesData = [];
      for (const element of species) {
        const partOfSpeciesData = filterData.filter((el) => el.species === element);
        speciesData.push(...partOfSpeciesData);
      }
      filterData = speciesData;
    }

    if (status === 'All') {
      if (name) {
        filterData = data.filter((el) => el.name.toUpperCase().includes(name.toUpperCase()));
      }
      if (location.length !== 0) {
        let locationData = [];
        for (const element of location) {
          const partOfLocationData = filterData.filter((el) => el.origin.name === element);
          locationData.push(...partOfLocationData);
        }
        filterData = locationData;
      }

      if (species.length !== 0) {
        let speciesData = [];
        for (const element of species) {
          const partOfSpeciesData = filterData.filter((el) => el.species === element);
          speciesData.push(...partOfSpeciesData);
        }
        filterData = speciesData;
      }
      if (status === 'All' && !name && !location.length && !species.length) {
        filterData = data;
      }
    }

    currentCharacters = filterData.slice(indexOfFirstCharacter, indexOfLastCharacter);
    totalCharacters = filterData.length;
  }

  //------ selected Characters -----

  const selectedCharactersHandler = (id, status) => {
    const include = selectedCharacters.includes(id);
    setSelectedCharacterStatus(() => status);
    if (!include) {
      setSelectedCharacters((prev) => [...prev, id]);
    } else {
      const arr = selectedCharacters.filter((el) => el !== id);
      setSelectedCharacters(arr);
    }
  };

  // ------ delete Characters -----
  const removeCharactersHandler = () => {
    let newData = data;

    selectedCharacters.forEach((element) => {
      newData = newData.filter((el) => el.id !== element);
    });

    setData(newData);
    setSelectedCharacters(() => []);
  };

  // ------ change status -----
  useEffect(() => {
    setReset(false);
  }, [reset]);

  const changeStatusHandler = (choosenNewStatus) => {
    const idSelectedCharacter = selectedCharacters[0];

    const newData = data.map((element) => {
      if (element.id === idSelectedCharacter) {
        return { ...element, status: choosenNewStatus };
      }
      return element;
    });

    setData(() => newData);
    setSelectedCharacterStatus(choosenNewStatus);
    setSelectedCharacters(() => []);
    setReset(() => true);
  };

  // ------ modal options -----
  const showModalHandler = () => {
    setShow(true);
  };
  const hideModalHandler = () => {
    setShow(false);
  };

  return (
    <div className={classes.container}>
      <ControlPanel
        filterByName={filterByNameHandler}
        filterByLocation={filterByLocationHandler}
        filterBySpecies={filterBySpeciesHandler}
        selectStatus={selectStatusHandler}
        showModal={showModalHandler}
        allLocationName={allLocationName}
        allSpecies={allSpecies}
        allSelectedCharacters={selectedCharacters}
        characterStatus={selctedCharacterStatus}
        setNewStatus={changeStatusHandler}
      />
      <List
        data={currentCharacters}
        loading={loading}
        selectedCharacters={selectedCharactersHandler}
        reset={reset}
      />
      {!loading && (
        <Pagination
          charactersPerPage={charactersPerPage}
          totalCharacters={totalCharacters}
          paginate={paginate}
        />
      )}

      {show && (
        <ConfirmRemove
          hideModal={hideModalHandler}
          charactersNumber={selectedCharacters.length}
          removeCharacters={removeCharactersHandler}
        />
      )}
    </div>
  );
}

export default App;
