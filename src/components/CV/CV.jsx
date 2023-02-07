import classes from "./CV.module.css";
import PersonalCV from "./PersonalCV";
import cvIcon from "../../assets/cv-icon.png";
import ExpCV from "./ExpCV";
import EduCV from "./EduCV";
import { useContext } from "react";
import cvContext from "../Store/cvContext";

const CV = () => {
  const ctx = useContext(cvContext)

  return (
    <div className={`${classes.cv} ${ctx.isSubmit && classes.cvBorder}`}>
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
