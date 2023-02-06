import { useContext } from "react";
import cvContext from "../Store/cvContext";
import ButtonContainer from "../UI/FormCard/ButtonContainer";
import ExperienceFormInputs from "./ExperienceFormInputs";
import classes from "./ExperienceFormInputs.module.css";

const ExperienceForm = () => {
  const ctx = useContext(cvContext);

  return (
    <form className={classes.experience} onSubmit={ctx.submitHandlerExp}>
      <ExperienceFormInputs />
      <ButtonContainer back="/personal" />
    </form>
  );
};

export default ExperienceForm;
