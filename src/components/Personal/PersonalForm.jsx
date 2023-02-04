import classes from "./PersonalForm.module.css";
import Input from "../UI/FormCard/Inputs/Input";
import InputUpload from "../UI/FormCard/Inputs/InputUpload";
import InputArea from "../UI/FormCard/Inputs/InputArea";
import { useContext } from "react";
import cvContext from "../Store/cvContext";
import NextPageButton from "../UI/FormCard/Buttons/NextPageButton";

const PersonalForm = () => {
  const ctx = useContext(cvContext);

  const { cvChangeHandler } = ctx;
  const { cvData } = ctx;
  const { cvIsValid } = ctx;

  return (
    <form className={classes.personal} onSubmit={ctx.submitHandler}>
      <div className={classes.formgrid}>
        <Input
          label="სახელი"
          valid="მინიმუმ 2 ასო, ქართული ასოები"
          onChange={cvChangeHandler.nameChangeHandler}
          value={cvData.enteredName}
          isValid={cvIsValid.nameIsValid}
          placeholder="ანზორი"
        />
        <Input
          label="გვარი"
          valid="მინიმუმ 2 ასო, ქართული ასოები"
          onChange={cvChangeHandler.lastnameChangeHandler}
          value={cvData.enteredLastname}
          isValid={cvIsValid.lastnameIsValid}
          placeholder="მუმლაძე"
        />
      </div>
      <div>
        <InputUpload onChange={cvChangeHandler.uploadChangeHandler} />
        <InputArea
          rows="5"
          label="ჩემ შესახებ (არასავალდებულო)"
          onChange={cvChangeHandler.bioChangeHandler}
          value={cvData.enteredBio}
          placeholder="ზოგადი ინფო შენ შესახებ"
        />
        <Input
          label="ელ.ფოსტა"
          valid="უნდა მთავრდებოდეს @redberry.ge-ით"
          onChange={cvChangeHandler.emailChangeHandler}
          value={cvData.enteredEmail}
          isValid={cvIsValid.emailIsValid}
          placeholder="anzorr666@redberry.ge"
        />
        <div style={{ marginTop: "26px" }}>
          <Input
            label="მობილურის ნომერი"
            valid="უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს"
            onChange={cvChangeHandler.mobileChangeHandler}
            value={cvData.enteredMobile}
            isValid={cvIsValid.mobileIsValid}
            placeholder="+995 551 12 34 56"
          />
        </div>
      </div>
      <NextPageButton />
    </form>
  );
};

export default PersonalForm;
