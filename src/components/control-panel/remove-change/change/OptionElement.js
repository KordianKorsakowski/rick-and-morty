const OptionElement = ({ option, closeOptions, setNewStatus }) => {
  const selectOptionHandler = () => {
    if (option === 'Alive' || option === 'Dead') setNewStatus(option);
    closeOptions();
  };

  return <li onClick={selectOptionHandler}>{option}</li>;
};

export default OptionElement;
