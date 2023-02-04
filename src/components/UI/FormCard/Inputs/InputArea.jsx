import classes from "./InputArea.module.css";

const InputArea = (props) => {
  return (
    <div className={classes.areaDiv}>
      <label htmlFor="">ჩემ შესახებ (არასავალდებულო)</label>
      <textarea placeholder="ზოგადი ინფო შენ შესახებ" rows={props.rows} />
    </div>
  );
};

export default InputArea;
