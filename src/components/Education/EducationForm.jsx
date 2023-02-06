import ButtonContainer from "../UI/FormCard/ButtonContainer";
import classes from "./Education.module.css";
import EducationFormInputs from "./EducationFormInputs";

const EducationForm = () => {
  return (
    <form className={classes.education}>
      <EducationFormInputs />
      <ButtonContainer back="/experience" />
    </form>
  );
};

export default EducationForm;
