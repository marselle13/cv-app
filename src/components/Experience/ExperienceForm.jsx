import { useContext } from "react";
import cvContext from "../Store/cvContext";
import ButtonContainer from "../UI/FormCard/ButtonContainer";
import ExperienceFormInputs from "./ExperienceFormInputs";
import classes from "./ExperienceFormInputs.module.css";

const ExperienceForm = () => {
  const { submitHandlerExp, addExpSize, addExp } = useContext(cvContext);
  const exp = {
    position: "",
    employer: "",
    start_date: "",
    due_date: "",
    description: "",
    isValid: {
      position: false,
      employer: false,
      start_date: false,
      due_date: false,
      description: false,
    },
  };

  return (
    <form
      className={classes.experience}
      onSubmit={submitHandlerExp}
      style={{ paddingBottom: addExpSize && "65px" }}
    >
      <ExperienceFormInputs />
      <ButtonContainer
        back="/personal"
        add={(e) => addExp(e, exp)}
        label="მეტი გამოცდილების დამატება"
        buttonLabel="შემდეგი"
      />
    </form>
  );
};

export default ExperienceForm;
