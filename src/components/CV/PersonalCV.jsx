import { useContext } from "react";
import cvContext from "../Store/cvContext";
import classes from "./PersonalCV.module.css";
import email from "../../assets/email.png";
import mobile from "../../assets/mobile.png";

const PersonalCV = () => {
  const ctx = useContext(cvContext);
  const { cvData } = ctx;
  const { personal } = cvData;

  return (
    <div
      className={classes.personalDiv}
      style={{ borderBottom: ctx.border && "1px solid  #C8C8C8" }}
    >
      <div>
        {(personal.name || personal.surname) && (
          <div className={classes.nameDiv}>
            <h2>
              {personal.name} {personal.surname}
            </h2>
          </div>
        )}
        {personal.email && (
          <div className={classes.contactDiv}>
            <img src={email} alt="email" />
            <p>{personal.email}</p>
          </div>
        )}
        {personal.mobile && (
          <div className={classes.contactDiv}>
            <img src={mobile} alt="mobile" />
            <p>{personal.mobile}</p>
          </div>
        )}
        {personal.bio && (
          <div className={classes.bioDiv}>
            <label>ჩემ შესახებ</label>
            <p>{personal.bio}</p>
          </div>
        )}
      </div>
      <div className={classes.imageDiv}>
        {cvData.enteredImage && (
          <img src={cvData.enteredImage} alt="personal" />
        )}
      </div>
    </div>
  );
};

export default PersonalCV;
