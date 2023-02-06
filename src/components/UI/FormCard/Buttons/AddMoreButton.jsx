import classes from "./AddMore.module.css";

const AddMoreButtton = (props) => {
  return (
    <button className={classes.addMore} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default AddMoreButtton;
