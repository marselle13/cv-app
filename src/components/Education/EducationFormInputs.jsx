import classes from "./Education.module.css";
import Input from "../UI/FormCard/Inputs/Input";
import { Fragment, useContext } from "react";
import cvContext from "../Store/cvContext";
import SelectInput from "../UI/FormCard/Inputs/SelectInput";
import InputDate from "../UI/FormCard/Inputs/InputDate";
import InputArea from "../UI/FormCard/Inputs/InputArea";
const EducationFormInputs = () => {
  const ctx = useContext(cvContext);
  const { cvData } = ctx;
  const { cvChangeHandler } = ctx;

  return (
    <Fragment>
      {cvData.experience.map((form, index) => (
        <div className={classes.educationFormDiv} key={index}>
          <Input
            name="school"
            label="სასწავლებელი"
            valid="მინიმუმ 2 სიმბოლო"
            onChange={(event) =>
              (cvChangeHandler.expHandler = (0, "position", event.target.value))
            }
            value={form.position}
            isValid={form.isValid.position}
            placeholder="სასწავლებელი"
          />
          <div className={classes.formgrid}>
            <SelectInput />
            <InputDate label="დამთავრების რიცხვი" />
          </div>
          <InputArea label="აღწერა" rows="7" />
        </div>
      ))}
    </Fragment>
  );
};

export default EducationFormInputs;
