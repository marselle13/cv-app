import { useContext } from "react";
import cvContext from "../Store/cvContext";
import classes from "./PersonalCV.module.css";
import email from "../../assets/email.png";
import mobile from "../../assets/mobile.png";
import { useLocation } from "react-router-dom";

const PersonalCV = (props) => {
  const { border, isSubmit } = useContext(cvContext);
  const location = useLocation();
  return (
    <div
      className={classes.personalDiv}
      style={{
        borderBottom:
          (border || (isSubmit && location.pathname === "/cv")) &&
          "1px solid  #C8C8C8",
      }}
    >
      <div>
        {(props.name || props.surname) && (
          <div className={classes.nameDiv}>
            <h2>
              {props?.name} {props?.surname}
            </h2>
          </div>
        )}
        {props.email && (
          <div className={classes.contactDiv}>
            <img src={email} alt="email" />
            <p>{props?.email}</p>
          </div>
        )}
        {props.phone_number && (
          <div className={classes.contactDiv}>
            <img src={mobile} alt="mobile" />
            <p>{props?.phone_number}</p>
          </div>
        )}
        {props.bio && (
          <div className={classes.bioDiv}>
            <label>ჩემ შესახებ</label>
            <p>{props?.bio}</p>
          </div>
        )}
      </div>
      <div className={classes.imageDiv}>
        {props.image && <img src={props?.image} alt="personal" />}
        {props.storage && (
          <img
            src={`https://resume.redberryinternship.ge${props?.storage}`}
            alt="personal"
          />
        )}
      </div>
    </div>
  );
};

export default PersonalCV;
