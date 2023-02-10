import classes from "./PersonalForm.module.css";
import Input from "../UI/FormCard/Inputs/Input";
import InputUpload from "../UI/FormCard/Inputs/InputUpload";
import InputArea from "../UI/FormCard/Inputs/InputArea";
import { useContext } from "react";
import cvContext from "../Store/cvContext";
import NextPageButton from "../UI/FormCard/Buttons/NextPageButton";

const PersonalForm = () => {
  const ctx = useContext(cvContext);
  const { cvChangeHandler, cvData } = ctx;
  const { personal } = cvData;
  const { setPersonal } = cvChangeHandler;
  const regexGeorgian = /^[\u10A0-\u10FF]+$/;
  const regexEmail = /^[a-zA-Z0-9._%+-]+@redberry\.ge$/;
  const regexMobile = /^(\+995)(79\d{7}|5\d{8})$/;
  const personalHandlerName = (e, field) => {
    setPersonal({
      ...personal,
      [field]: e.target.value,
      isValid: {
        ...personal.isValid,
        [field]:
          e.target.value.trim().length > 1 &&
          regexGeorgian.test(e.target.value.trim()),
      },
    });
  };

  const uploadChangeHandler = (event) => {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = () => {
      setPersonal({
        ...personal,
        image: reader.result,
        isValid: {
          ...personal.isValid,
          image: reader.result.length > 0,
        },
      });
    };
  };

  return (
    <form className={classes.personal} onSubmit={ctx.submitHandlerPersonal}>
      <div className={classes.formgrid}>
        <Input
          label="სახელი"
          valid="მინიმუმ 2 ასო, ქართული ასოები"
          onChange={(e) => personalHandlerName(e, "name")}
          value={personal.name}
          isValid={personal.isValid.name}
          placeholder="ანზორი"
        />
        <Input
          label="გვარი"
          valid="მინიმუმ 2 ასო, ქართული ასოები"
          onChange={(e) => {
            personalHandlerName(e, "surname");
          }}
          value={personal.surname}
          isValid={personal.isValid.surname}
          placeholder="მუმლაძე"
        />
      </div>
      <div>
        <InputUpload onChange={uploadChangeHandler} />
        <InputArea
          rows="4"
          label="ჩემ შესახებ (არასავალდებულო)"
          onChange={(e) => {
            setPersonal({ ...personal, bio: e.target.value });
          }}
          value={personal.bio}
          placeholder="ზოგადი ინფო შენ შესახებ"
        />
        <Input
          label="ელ.ფოსტა"
          valid="უნდა მთავრდებოდეს @redberry.ge-ით"
          onChange={(e) => {
            setPersonal({
              ...personal,
              email: e.target.value,
              isValid: {
                ...personal.isValid,
                email: regexEmail.test(e.target.value.trim()),
              },
            });
          }}
          value={personal.email}
          isValid={personal.isValid.email}
          placeholder="anzorr666@redberry.ge"
        />
        <div style={{ marginTop: "26px" }}>
          <Input
            label="მობილურის ნომერი"
            valid="უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს"
            onChange={(e) => {
              setPersonal({
                ...personal,
                phone_number: e.target.value,
                isValid: {
                  ...personal.isValid,
                  phone_number: regexMobile.test(e.target.value.trim()),
                },
              });
            }}
            value={personal.phone_number}
            isValid={personal.isValid.phone_number}
            placeholder="+995 551 12 34 56"
          />
        </div>
      </div>
      <NextPageButton buttonLabel="შემდეგი" />
    </form>
  );
};

export default PersonalForm;
