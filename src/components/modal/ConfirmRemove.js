import ReactDOM from 'react-dom';

import classes from './confirm-remove.module.css';

const Backdrop = ({ hideModal }) => {
  return <div className={classes.backdrop} onClick={() => hideModal()} />;
};

const ModalOverlay = ({ hideModal, charactersNumber, removeCharacters }) => {
  const confirmRemove = () => {
    hideModal();
    removeCharacters();
  };

  return (
    <div className={classes.modal}>
      <header className={classes.title}>
        <h2>{`Are you sure and want to delete ${charactersNumber} characters?`}</h2>
      </header>

      <footer>
        <button className={`${classes.btn} ${classes.ok}`} onClick={confirmRemove}>
          Confirm
        </button>
        <button className={`${classes.btn} ${classes.back}`} onClick={() => hideModal()}>
          Don't Confirm
        </button>
      </footer>
    </div>
  );
};
const ConfirmRemove = ({ hideModal, charactersNumber, removeCharacters }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop hideModal={hideModal} />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          hideModal={hideModal}
          charactersNumber={charactersNumber}
          removeCharacters={removeCharacters}
        />,
        document.getElementById('overlay-root')
      )}
    </>
  );
};

export default ConfirmRemove;
