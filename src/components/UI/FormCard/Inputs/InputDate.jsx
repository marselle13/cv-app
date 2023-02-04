import classes from "./InputDate.module.css";

const InputDate = (props) => {
  console.log(props);
  return (
    <div className={classes.dateDiv}>
      <label htmlFor="">{props.label}</label>
      <input
        type="date"
        onChange={props.onChange}
        className={`${props.isValid && classes.passBorder}`}
      />
    </div>
  );
};

export default InputDate;
