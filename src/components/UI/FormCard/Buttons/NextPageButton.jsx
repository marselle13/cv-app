import classes from "./NextPageButton.module.css";

const NextPageButton = (props) => {
  return (
    <button className={classes.nextPage} onClick={props.onClick}>
      {props.buttonLabel}
    </button>
  );
};

export default NextPageButton;
