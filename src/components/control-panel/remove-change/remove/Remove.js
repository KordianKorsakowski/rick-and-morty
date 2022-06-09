import classes from '../remove-change-btn.module.css';

const Remove = ({ showModal, length }) => {
  return (
    <button
      disabled={length < 1}
      onClick={() => showModal()}
      className={`${classes.btn} ${classes.remove}`}
    >
      <i className="bi bi-trash-fill"></i>
      <p>Remove characters</p>
    </button>
  );
};

export default Remove;
