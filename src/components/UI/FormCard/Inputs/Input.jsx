import classes from "./Input.module.css";
import passIcon from "../../../../assets/pass-icon.png";
import errorIcon from "../../../../assets/error-icon.png";

const Input = (props) => {
  return (
    <div className={classes.formDiv} style={props.style}>
      <label
        htmlFor=""
        className={`${
          ((!props.isValid && props.value.length !== 0) ||
            (props.empty && props.value.length === 0)) &&
          classes.errorLabel
        }`}
      >
        {props.label}
      </label>
      <div className={classes.inputDiv}>
        <input
          type="text"
          onChange={props.onChange}
          value={props.value}
          className={`${props.isValid && classes.passBorder} ${
            ((!props.isValid && props.value.length !== 0) ||
              (props.empty && props.value.length === 0)) &&
            classes.errorBorder
          }`}
          placeholder={props.placeholder}
          name={props.name}
        />
        {props.isValid && (
          <img src={passIcon} alt="pass" className={classes.pass} />
        )}
        {((!props.isValid && props.value.length !== 0) ||
          (props.empty && props.value.length === 0)) && (
          <img src={errorIcon} alt="erorr" className={classes.error} />
        )}
      </div>
      <span>{props.valid}</span>
    </div>
  );
};

export default Input;
