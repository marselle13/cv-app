import classes from "./Education.module.css";
import Input from "../UI/FormCard/Inputs/Input";
import { Fragment, useContext } from "react";
import cvContext from "../Store/cvContext";
import SelectInput from "../UI/FormCard/Inputs/SelectInput";
import InputDate from "../UI/FormCard/Inputs/InputDate";
import InputArea from "../UI/FormCard/Inputs/InputArea";
const EducationFormInputs = () => {
  const ctx = useContext(cvContext);
  const { cvData, cvChangeHandler } = ctx;

  return (
    <Fragment>
      {cvData.education.map((form, index) => (
        <div className={classes.educationFormDiv} key={index}>
          <Input
            label="სასწავლებელი"
            valid="მინიმუმ 2 სიმბოლო"
            onChange={(event) =>
              cvChangeHandler.eduHandler(index, "school", event.target.value)
            }
            value={form.school}
            isValid={form.isValid.school}
            placeholder="სასწავლებელი"
          />
          <div className={classes.formgrid}>
            <SelectInput index={index} isValid={form.isValid.degrees} />
            <InputDate
              label="დამთავრების რიცხვი"
              isValid={form.isValid.endDate}
              value={form.endDate}
              onChange={(event) =>
                cvChangeHandler.eduHandler(index, "endDate", event.target.value)
              }
            />
          </div>
          <InputArea
            label="აღწერა"
            rows="7"
            isValid={form.isValid.description}
            value={form.description}
            onChange={(event) =>
              cvChangeHandler.eduHandler(
                index,
                "description",
                event.target.value
              )
            }
          />
        </div>
      ))}
    </Fragment>
  );
};

export default EducationFormInputs;
