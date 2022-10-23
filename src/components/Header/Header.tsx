import classes from "./Header.module.css";

const Header: React.FC = () => {
  return (
    <header className={classes.header}>
      <h1 className={classes.h1}>Moovees</h1>
    </header>
  );
};

export default Header;
