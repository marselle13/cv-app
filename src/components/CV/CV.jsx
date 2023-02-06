import classes from "./CV.module.css";
import PersonalCV from "./PersonalCV";
import cvIcon from "../../assets/cv-icon.png";
import ExpCV from "./ExpCV";

const CV = () => {
  return (
    <div className={classes.cv}>
      <div className={classes.cvDiv}>
        <PersonalCV />
        <ExpCV />
      </div>
      <img src={cvIcon} alt="" />
    </div>
  );
};

export default CV;
