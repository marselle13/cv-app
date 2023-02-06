import classes from "./InputArea.module.css";

const InputArea = (props) => {
  return (
    <div className={classes.areaDiv}>
      <label>{props.label}</label>
      <textarea
        props={props.name}
        placeholder={props.placeholder}
        rows={props.rows}
        onChange={props.onChange}
        value={props.value}
        className={`${props.isValid && classes.passBorder}`}
      />
    </div>
  );
};

export default InputArea;
