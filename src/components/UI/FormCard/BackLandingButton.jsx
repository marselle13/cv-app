import landingBack from "../../../assets/landing-back.png";
import classes from "./BackLandingButton.module.css";
import { Link } from "react-router-dom";

const BackLandingButton = (props) => {
  return (
    <Link to="/cv-app" onClick={props.end}>
      <button className={classes.backLanding}>
        <img src={landingBack} alt="" />
      </button>
    </Link>
  );
};

export default BackLandingButton;
