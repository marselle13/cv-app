import classes from "./Education.module.css";
import Input from "../UI/FormCard/Inputs/Input";
import { Fragment, useContext } from "react";
import cvContext from "../Store/cvContext";
import SelectInput from "../UI/FormCard/Inputs/SelectInput";
import InputDate from "../UI/FormCard/Inputs/InputDate";
import InputArea from "../UI/FormCard/Inputs/InputArea";
const EducationFormInputs = () => {
  const { cvData, cvChangeHandler, emptyEducation } = useContext(cvContext);

  return (
    <Fragment>
      {cvData.education.map((form, index) => (
        <div className={classes.educationFormDiv} key={index}>
          <Input
            label="სასწავლებელი"
            valid="მინიმუმ 2 სიმბოლო"
            onChange={(event) =>
              cvChangeHandler.eduHandler(index, "institute", event.target.value)
            }
            empty={emptyEducation}
            value={form.institute}
            isValid={form.isValid.institute}
            placeholder="სასწავლებელი"
          />
          <div className={classes.formgrid}>
            <SelectInput
              index={index}
              isValid={form.isValid.degrees}
              empty={emptyEducation}
            />
            <InputDate
              label="დამთავრების რიცხვი"
              isValid={form.isValid.due_date}
              value={form.due_date}
              empty={emptyEducation}
              onChange={(event) =>
                cvChangeHandler.eduHandler(
                  index,
                  "due_date",
                  event.target.value
                )
              }
            />
          </div>
          <InputArea
            label="აღწერა"
            rows="7"
            isValid={form.isValid.description}
            value={form.description}
            empty={emptyEducation}
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
