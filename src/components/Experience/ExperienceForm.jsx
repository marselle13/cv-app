import { useContext } from "react";
import cvContext from "../Store/cvContext";
import ButtonContainer from "../UI/FormCard/ButtonContainer";
import ExperienceFormInputs from "./ExperienceFormInputs";
import classes from "./ExperienceFormInputs.module.css";

const ExperienceForm = () => {
  const ctx = useContext(cvContext);
  const exp = {
    position: "",
    employer: "",
    startDate: "",
    endDate: "",
    description: "",
    isValid: {
      position: false,
      employer: false,
      startDate: false,
      endDate: false,
      description: false,
    },
  };

  return (
    <form
      className={classes.experience}
      onSubmit={ctx.submitHandlerExp}
      style={{ paddingBottom: ctx.addExpSize && "65px" }}
    >
      <ExperienceFormInputs />
      <ButtonContainer
        back="/personal"
        add={(e) => ctx.addExp(e, exp)}
        label="მეტი გამოცდილების დამატება"
      />
    </form>
  );
};

export default ExperienceForm;
