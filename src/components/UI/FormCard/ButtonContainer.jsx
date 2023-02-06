import { useContext } from "react";
import { Link } from "react-router-dom";
import cvContext from "../../Store/cvContext";
import AddMoreButtton from "./Buttons/AddMoreButton";
import BackPageButton from "./Buttons/BackPageButton";
import NextPageButton from "./Buttons/NextPageButton";
import classes from "./ButtonContainer.module.css";

const ButtonContainer = (props) => {
  const ctx = useContext(cvContext);
  return (
    <div className={classes.buttonContainer}>
      <AddMoreButtton onClick={ctx.addExp}>
        მეტი გამოცდილების დამატება
      </AddMoreButtton>
      <div className={classes.backNextDiv}>
        <Link to={props.back}>
          <BackPageButton />
        </Link>
        <NextPageButton />
      </div>
    </div>
  );
};
export default ButtonContainer;
