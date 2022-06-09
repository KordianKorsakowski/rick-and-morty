import Remove from './remove/Remove';
import Change from './change/Change';
import classes from './remove-and-change.module.css';

const RemoveAndChange = ({ allSelectedCharacters, showModal, characterStatus, setNewStatus }) => {
  const length = allSelectedCharacters.length;
  const show = length <= 1;

  return (
    <div className={classes.container}>
      {show && (
        <Change length={length} characterStatus={characterStatus} setNewStatus={setNewStatus} />
      )}
      <Remove showModal={showModal} length={length} />
    </div>
  );
};

export default RemoveAndChange;
