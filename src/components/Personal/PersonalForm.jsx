import classes from "./PersonalForm.module.css";
import Input from "../UI/FormCard/Input";
import useInput from "../hooks/use-input";

const PersonalForm = () => {
  const regexGeorgian = /^[\u10A0-\u10FF]+$/;
  const {
    value: enteredName,
    isValid: nameIsValid,
    valueChangeHandler: nameChangeHandler,
  } = useInput((value) => regexGeorgian.test(value) && value.trim().length > 1);
  const {
    value: enteredLastname,
    isValid: lastnameIsValid,
    valueChangeHandler: lastnameChangeHandler,
  } = useInput((value) => regexGeorgian.test(value) && value.trim().length > 1);

  return (
    <form className={classes.personal}>
      <div className={classes.formgrid}>
        <Input
          label="სახელი"
          valid="მინიმუმ 2 ასო, ქართული ასოები"
          onChange={nameChangeHandler}
          value={enteredName}
          isValid={nameIsValid}
        />
        <Input
          label="გვარი"
          valid="მინიმუმ 2 ასო, ქართული ასოები"
          onChange={lastnameChangeHandler}
          value={enteredLastname}
          isValid={lastnameIsValid}
        />
      </div>
    </form>
  );
};

export default PersonalForm;
