import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import backgroundLogo from "../../assets/background-logo.png";
import classes from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={classes.landing}>
      <div className={classes.header}>
        <img src={logo} alt="" />
      </div>
      <div className={classes.buttonDiv}>
        <Link to="/personal">
          <button className={classes.landingButton}>რეზიუმის დამატება</button>
        </Link>
        <div className={classes.backgroundDiv}>
          <img src={backgroundLogo} alt="Logo" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
