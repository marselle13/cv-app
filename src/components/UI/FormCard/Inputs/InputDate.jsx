import classes from "./InputDate.module.css";

const InputDate = (props) => {
  return (
    <div className={classes.dateDiv}>
      <label
        htmlFor=""
        className={!props.isValid && props.empty ? classes.errorLabel : ""}
      >
        {props.label}
      </label>
      <input
        type="date"
        onChange={props.onChange}
        value={props.value}
        className={`${props.isValid ? classes.passBorder : ""} ${
          !props.isValid && props.empty ? classes.errorBorder : ""
        }`}
      />
    </div>
  );
};

export default InputDate;
