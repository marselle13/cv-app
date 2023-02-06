import ButtonContainer from "../UI/FormCard/ButtonContainer";
import classes from "./Education.module.css";

const EducationForm = () => {
  return (
    <form className={classes.education}>
      <ButtonContainer back="/experience" />
    </form>
  );
};

export default EducationForm;
