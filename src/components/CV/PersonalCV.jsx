import { useContext } from "react";
import cvContext from "../Store/cvContext";
import classes from "./PersonalCV.module.css";
import email from "../../assets/email.png";
import mobile from "../../assets/mobile.png";

const PersonalCV = () => {
  const ctx = useContext(cvContext);
  const { cvData } = ctx;

  return (
    <div className={classes.personalDiv}>
      <div>
        {(cvData.enteredName || cvData.enteredLastname) && (
          <div className={classes.nameDiv}>
            <h2>
              {cvData.enteredName} {cvData.enteredLastname}
            </h2>
          </div>
        )}
        {cvData.enteredEmail && (
          <div className={classes.contactDiv}>
            <img src={email} alt="email" />
            <p>{cvData.enteredEmail}</p>
          </div>
        )}
        {cvData.enteredMobile && (
          <div className={classes.contactDiv}>
            <img src={mobile} alt="mobile" />
            <p>{cvData.enteredMobile}</p>
          </div>
        )}
        {cvData.enteredBio && (
          <div className={classes.bioDiv}>
            <label>ჩემ შესახებ</label>
            <p>{cvData.enteredBio}</p>
          </div>
        )}
      </div>

      <div className={classes.imageDiv}>
        {cvData.enteredImage && <img src={cvData.enteredImage} />}
      </div>
    </div>
  );
};

export default PersonalCV;
