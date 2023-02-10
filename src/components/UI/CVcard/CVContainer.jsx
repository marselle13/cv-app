import { useContext } from "react";
import cvIcon from "../../../assets/cv-icon.png";
import cvContext from "../../Store/cvContext";
import classes from "./CVContainer.module.css";

const CVContainer = (props) => {
  const { isSubmit } = useContext(cvContext);

  return (
    <div className={`${classes.cv} ${isSubmit && classes.cvBorder}`}>
      <div className={classes.cvDiv}>{props.children}</div>
      <img src={cvIcon} alt="" />
    </div>
  );
};

export default CVContainer;
