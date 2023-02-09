import landingBack from "../../../assets/landing-back.png";
import classes from "./BackLandingButton.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import cvContext from "../../Store/cvContext";

const BackLandingButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cvData } = useContext(cvContext);
  console.log(cvData);

  const clear = () => {
    navigate("/");
  };

  return (
    <button className={classes.backLanding} onClick={clear}>
      <img src={landingBack} alt="" />
    </button>
  );
};

export default BackLandingButton;
