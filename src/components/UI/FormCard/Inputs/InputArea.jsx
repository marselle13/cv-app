import classes from "./InputArea.module.css";

const InputArea = (props) => {
  console.log(props.empty);

  return (
    <div className={classes.areaDiv}>
      <label
        className={`${props.empty && !props.isValid && classes.errorLabel}`}
      >
        {props.label}
      </label>
      <textarea
        props={props.name}
        placeholder={props.placeholder}
        rows={props.rows}
        onChange={props.onChange}
        value={props.value}
        className={`${props.isValid && classes.passBorder} ${
          props.empty && !props.isValid && classes.errorBorder
        }`}
      />
    </div>
  );
};

export default InputArea;
