import Character from './single-character/Character';
import Menu from './menu/Menu';
import classes from './List.module.css';

const List = ({ data, loading, selectedCharacters, reset }) => {
  const selectedCharactersHandler = (id, status) => {
    selectedCharacters(id, status);
  };

  if (loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }
  // console.log(data);
  return (
    <ul className={classes.list}>
      <Menu />
      {data.map((el) => (
        <Character
          key={el.id}
          name={el.name}
          status={el.status}
          id={el.id}
          image={el.image}
          species={el.species}
          episode={el.episode}
          origin={el.origin}
          location={el.location}
          selectedCharacters={selectedCharactersHandler}
          reset={reset}
        />
      ))}
    </ul>
  );
};

export default List;
