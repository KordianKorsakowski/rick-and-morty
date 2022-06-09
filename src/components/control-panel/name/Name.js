import classes from './name.module.css';
const Name = ({ filterByName }) => {
  const filterNameHandler = (e) => {
    filterByName(e.target.value);
  };

  return (
    <input
      onChange={filterNameHandler}
      className={classes.input}
      type="text"
      placeholder="Search                        🔍"
    />
  );
};

export default Name;
