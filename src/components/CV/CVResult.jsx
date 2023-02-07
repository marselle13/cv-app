import classes from "./CV.module.css";
import CV from "./CV";
import arrow from "../../assets/landing-back.png";
import close from "../../assets/close.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CVResult = () => {
  const [closeTab, setCloseTab] = useState(false);
  const navigate = useNavigate();

  const endHandler = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <div className={classes.cvResult}>
      <button onClick={endHandler}>
        <img src={arrow} alt="" />
      </button>
      <div className={classes.cvResultDiv}>
        <CV />
      </div>
      <div className={`${classes.message} ${closeTab && classes.close}`}>
        <div>
          <img src={close} alt="" onClick={() => setCloseTab(true)} />
        </div>

        <h5>რეზიუმე წარმატებით გაიგზავნა 🎉</h5>
      </div>
    </div>
  );
};

export default CVResult;
