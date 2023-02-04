import BackLandingButton from "./BackLandingButton";
import classes from "./FormCard.module.css";
import FormTitle from "./FormTitle";

const FormCard = (props) => {
  return (
    <div className={classes.formCard}>
      <div className={classes.form}>
        <BackLandingButton />

        <FormTitle
          label={props.label}
          number={props.number}
          children={props.children}
        />
      </div>
    </div>
  );
};
export default FormCard;
