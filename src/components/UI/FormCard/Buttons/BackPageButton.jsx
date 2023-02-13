import classes from "./BackPage.module.css";

const BackPageButton = (props) => {
  return (
    <button onClick={() => props.onClick(false)} className={classes.backPage}>
      უკან
    </button>
  );
};

export default BackPageButton;
