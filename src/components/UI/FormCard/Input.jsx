import classes from "./Input.module.css";
import passIcon from "../../../assets/pass-icon.png";
import errorIcon from "../../../assets/error-icon.png";

const Input = (props) => {
  return (
    <div className={classes.formDiv}>
      <label htmlFor="">{props.label}</label>
      <div className={classes.inputDiv}>
        <input type="text" onChange={props.onChange} value={props.value} />
        {props.isValid && (
          <img src={passIcon} alt="pass" className={classes.pass} />
        )}
        {!props.isValid && props.value.length !== 0 && (
          <img src={errorIcon} alt="erorr" className={classes.error} />
        )}
      </div>
      <span>{props.valid}</span>
    </div>
  );
};

export default Input;
