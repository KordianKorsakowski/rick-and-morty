import style from './menu.module.css';
import classes from '../single-character/Character.module.css';
const Menu = () => {
  return (
    <li className={`${classes.element} ${style.menu}`}>
      <i className="bi bi-app"></i>
      <div className={classes.containerName}>
        <p>Name</p>
      </div>
      <div className={classes.containerImg}>
        <p>Avatar</p>
      </div>

      <div className={classes.containerOrigin}>
        <p>Origin</p>
      </div>
      <div className={classes.containerOrigin}>
        <p>Episodes</p>
      </div>
      <div className={classes.containerAlive}>
        <p>Status</p>
      </div>
    </li>
  );
};
export default Menu;
