import classes from "./PersonalForm.module.css";
import Input from "../UI/FormCard/Inputs/Input";
import useInput from "../hooks/use-input";
import InputUpload from "../UI/FormCard/Inputs/InputUpload";
import InputArea from "../UI/FormCard/Inputs/InputArea";

const PersonalForm = () => {
  const regexGeorgian = /^[\u10A0-\u10FF]+$/;
  const regexEmail = /^([A-Za-z0-9_\-\.])+\@([redberry])+\.(ge)$/;
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
  const {
    value: enteredEmail,
    isValid: emailIsValid,
    valueChangeHandler: emailChangeHandler,
  } = useInput((value) => regexEmail.test(value));

  return (
    <form className={classes.personal}>
      <div className={classes.formgrid}>
        <Input
          label="სახელი"
          valid="მინიმუმ 2 ასო, ქართული ასოები"
          onChange={nameChangeHandler}
          value={enteredName}
          isValid={nameIsValid}
          placeholder="ანზორი"
        />
        <Input
          label="გვარი"
          valid="მინიმუმ 2 ასო, ქართული ასოები"
          onChange={lastnameChangeHandler}
          value={enteredLastname}
          isValid={lastnameIsValid}
          placeholder="მუმლაძე"
        />
      </div>
      <div>
        <InputUpload />
        <InputArea rows="5" />
        <Input
          label="ელ.ფოსტა"
          valid="უნდა მთავრდებოდეს @redberry.ge-ით"
          onChange={emailChangeHandler}
          value={enteredEmail}
          isValid={emailIsValid}
          placeholder="anzorr666@redberry.ge"
        />
      </div>
    </form>
  );
};

export default PersonalForm;
