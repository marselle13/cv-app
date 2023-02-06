import { useContext } from "react";
import { Link } from "react-router-dom";
import cvContext from "../Store/cvContext";
import AddMoreButtton from "../UI/FormCard/Buttons/AddMoreButton";
import BackPageButton from "../UI/FormCard/Buttons/BackPageButton";
import NextPageButton from "../UI/FormCard/Buttons/NextPageButton";
import ExperienceFormInputs from "./ExperienceFormInputs";
import classes from "./ExperienceFormInputs.module.css";

const ExperienceForm = () => {
  const ctx = useContext(cvContext);

  return (
    <form className={classes.experience}>
      <ExperienceFormInputs />

      <div className={classes.buttonContainer}>
        <AddMoreButtton onClick={ctx.addExp}>
          მეტი გამოცდილების დამატება
        </AddMoreButtton>
        <div className={classes.backNextDiv}>
          <Link to="/personal">
            <BackPageButton />
          </Link>
          <NextPageButton onClick={ctx.submitHandlerExp} />
        </div>
      </div>
    </form>
  );
};

export default ExperienceForm;
