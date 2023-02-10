import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import backgroundLogo from "../../assets/background-logo.png";
import classes from "./LandingPage.module.css";
import React, { useEffect } from "react";

const LandingPage = (props) => {
  const location = useLocation();

  useEffect(() => {
    const firstReload = localStorage.getItem("firstReload");

    if (location.pathname === "/" && firstReload === null) {
      localStorage.clear();
      localStorage.setItem("firstReload", "true");
      window.location.reload();
    }
  }, [location.pathname]);

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
