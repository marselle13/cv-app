import classes from "./Education.module.css";
import Input from "../UI/FormCard/Inputs/Input";
import { Fragment, useContext } from "react";
import cvContext from "../Store/cvContext";
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
            placeholder="დეველოპერი, დიზაინერი, ა.შ."
          />
          <div>
            <select name="" id="">
              <option value=""></option>
            </select>
          </div>
        </div>
      ))}
    </Fragment>
  );
};

export default EducationFormInputs;
