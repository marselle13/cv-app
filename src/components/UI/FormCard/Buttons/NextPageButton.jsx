import classes from "./NextPageButton.module.css";

const NextPageButton = (props) => {
  return (
    <button className={classes.nextPage} onClick={props.onClick}>
      შემდეგი
    </button>
  );
};

export default NextPageButton;
