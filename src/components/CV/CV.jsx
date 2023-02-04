import classes from "./CV.module.css";
import PersonalCV from "./PersonalCV";
import cvIcon from "../../assets/cv-icon.png";

const CV = () => {
  return (
    <div className={classes.cv}>
      <PersonalCV />
      <img src={cvIcon} alt="" />
    </div>
  );
};

export default CV;
