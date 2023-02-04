import classes from "./CV.module.css";
import PersonalCV from "./PersonalCV";

const CV = () => {
  return (
    <div className={classes.cv}>
      <PersonalCV />
    </div>
  );
};

export default CV;
