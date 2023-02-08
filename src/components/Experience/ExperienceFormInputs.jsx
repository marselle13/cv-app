import Input from "../UI/FormCard/Inputs/Input";
import classes from "./ExperienceFormInputs.module.css";
import { Fragment, useContext } from "react";
import cvContext from "../Store/cvContext";
import InputDate from "../UI/FormCard/Inputs/InputDate";
import InputArea from "../UI/FormCard/Inputs/InputArea";

const ExperienceFormInputs = () => {
  const ctx = useContext(cvContext);
  const { cvChangeHandler } = ctx;
  const { cvData } = ctx;
  return (
    <Fragment>
      {cvData.experience.map((form, index) => (
        <div className={classes.experienceInputDiv} key={index}>
          <Input
            name="position"
            label="თანამდებობა"
            valid="მინიმუმ 2 სიმბოლო"
            onChange={(event) =>
              cvChangeHandler.expHandler(index, "position", event.target.value)
            }
            value={form.position}
            isValid={form.isValid.position}
            placeholder="დეველოპერი, დიზაინერი, ა.შ."
          />
          <Input
            name="employer"
            label="დამსაქმებელი"
            valid="მინიმუმ 2 სიმბოლო"
            onChange={(event) =>
              cvChangeHandler.expHandler(index, "employer", event.target.value)
            }
            value={form.employer}
            isValid={form.isValid.employer}
            placeholder="დამსაქმებელი"
            style={{ marginTop: "30px" }}
          />

          <div className={classes.formgrid}>
            <InputDate
              name="startDate"
              label="დაწყების რიცხვი"
              onChange={(event) =>
                cvChangeHandler.expHandler(
                  index,
                  "startDate",
                  event.target.value
                )
              }
              value={form.startDate}
              isValid={form.isValid.startDate}
            />
            <InputDate
              label="დამთავრების რიცხვი"
              onChange={(event) =>
                cvChangeHandler.expHandler(index, "endDate", event.target.value)
              }
              value={form.endDate}
              isValid={form.isValid.endDate}
            />
          </div>
          <InputArea
            name="description"
            label="აღწერა"
            rows="5"
            placeholder="როლი თანამდებობაზე და ზოგადი აღწერა"
            onChange={(event) =>
              cvChangeHandler.expHandler(
                index,
                "description",
                event.target.value
              )
            }
            value={form.description}
            isValid={form.isValid.description}
          />
        </div>
      ))}
    </Fragment>
  );
};

export default ExperienceFormInputs;
