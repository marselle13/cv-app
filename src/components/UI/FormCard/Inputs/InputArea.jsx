import classes from "./InputArea.module.css";

const InputArea = (props) => {
  return (
    <div className={classes.areaDiv}>
      <label>{props.label}</label>
      <textarea
        placeholder={props.placeholder}
        rows={props.rows}
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  );
};

export default InputArea;
