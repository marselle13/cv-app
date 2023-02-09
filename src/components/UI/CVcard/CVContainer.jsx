import { useContext } from "react";
import cvIcon from "../../../assets/cv-icon.png";
import cvContext from "../../Store/cvContext";
import classes from "./CVContainer.module.css";

const CVContainer = (props) => {
  const ctx = useContext(cvContext);

  return (
    <div className={`${classes.cv} ${ctx.isSubmit && classes.cvBorder}`}>
      <div className={classes.cvDiv}>{props.children}</div>
      <img src={cvIcon} alt="" />
    </div>
  );
};

export default CVContainer;
