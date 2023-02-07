import classes from "./CV.module.css";
import PersonalCV from "./PersonalCV";
import cvIcon from "../../assets/cv-icon.png";
import ExpCV from "./ExpCV";
import EduCV from "./EduCV";

const CV = () => {
  return (
    <div className={classes.cv}>
      <div className={classes.cvDiv}>
        <PersonalCV />
        <ExpCV />
        <EduCV />
      </div>
      <img src={cvIcon} alt="" />
    </div>
  );
};

export default CV;
