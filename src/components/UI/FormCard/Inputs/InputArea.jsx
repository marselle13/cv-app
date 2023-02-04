import classes from "./InputArea.module.css";

const InputArea = (props) => {
  return (
    <div className={classes.areaDiv}>
      <label htmlFor="">ჩემ შესახებ (არასავალდებულო)</label>
      <textarea
        placeholder="ზოგადი ინფო შენ შესახებ"
        rows={props.rows}
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  );
};

export default InputArea;
