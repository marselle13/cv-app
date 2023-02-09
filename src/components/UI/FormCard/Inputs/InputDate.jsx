import classes from "./InputDate.module.css";

const InputDate = (props) => {
  return (
    <div className={classes.dateDiv}>
      <label htmlFor="">{props.label}</label>
      <input
        type="date"
        onChange={props.onChange}
        value={props.value}
        className={`${props.isValid && classes.passBorder}`}
      />
    </div>
  );
};

export default InputDate;
