import classes from "./CV.module.css";
import CV from "./CV";
import arrow from "../../assets/landing-back.png";
import close from "../../assets/close.png";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import cvContext from "../Store/cvContext";

const CVResult = () => {
  const ctx = useContext(cvContext);
  const navigate = useNavigate();

  const endHandler = () => {
    setTimeout(() => {
      localStorage.clear();
      window.location.reload();
    }, 1000);

    navigate("/cv-app");
  };

  return (
    <div className={classes.cvResult}>
      <button onClick={endHandler}>
        <img src={arrow} alt="" />
      </button>
      <div className={classes.cvResultDiv}>
        <CV />
      </div>
      <div className={`${classes.message} ${!ctx.tab && classes.close}`}>
        <div>
          <img src={close} alt="" onClick={() => ctx.setTab(false)} />
        </div>

        <h5>რეზიუმე წარმატებით გაიგზავნა 🎉</h5>
      </div>
    </div>
  );
};

export default CVResult;
