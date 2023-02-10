import landingBack from "../../../assets/landing-back.png";
import classes from "./BackLandingButton.module.css";
import { useNavigate } from "react-router-dom";

const BackLandingButton = () => {
  const navigate = useNavigate();

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
