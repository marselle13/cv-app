import { useContext } from "react";
import { useLocation } from "react-router-dom";
import cvIcon from "../../../assets/cv-icon.png";
import cvContext from "../../Store/cvContext";
import classes from "./CVContainer.module.css";

const CVContainer = (props) => {
  const { isSubmit } = useContext(cvContext);
  const location = useLocation();

  return (
    <div
      className={`${classes.cv} ${
        isSubmit && location.pathname === "/cv" && classes.cvBorder
      }`}
    >
      <div className={classes.cvDiv}>{props.children}</div>
      <img src={cvIcon} alt="" />
    </div>
  );
};

export default CVContainer;
