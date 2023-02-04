import ExperienceFormInputs from "./ExperienceFormInputs";
import classes from "./ExperienceFormInputs.module.css";
const ExperienceForm = () => {
  return (
    <form className={classes.experience}>
      <ExperienceFormInputs />
    </form>
  );
};

export default ExperienceForm;
