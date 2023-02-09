import { Link } from "react-router-dom";
import AddMoreButtton from "./Buttons/AddMoreButton";
import BackPageButton from "./Buttons/BackPageButton";
import NextPageButton from "./Buttons/NextPageButton";
import classes from "./ButtonContainer.module.css";

const ButtonContainer = (props) => {
  return (
    <div className={classes.buttonContainer}>
      <AddMoreButtton onClick={props.add}>{props.label}</AddMoreButtton>
      <div className={classes.backNextDiv}>
        <Link to={props.back}>
          <BackPageButton />
        </Link>
        <NextPageButton onClick={props.onClick} />
      </div>
    </div>
  );
};
export default ButtonContainer;
