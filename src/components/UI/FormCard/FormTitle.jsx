import classes from "./FormTitle.module.css";

const FormTitle = (props) => {
  return (
    <div className={classes.formContainer}>
      <div className={classes.formTitle}>
        <h2>{props.label}</h2>
        <p>{props.number}/3</p>
      </div>
      {props.children}
    </div>
  );
};

export default FormTitle;
