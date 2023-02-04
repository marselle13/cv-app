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
  const { cvIsValid } = ctx;
  console.log(cvData.enteredStartingDate);

  return (
    <div>
      <Input
        label="თანამდებობა"
        valid="მინიმუმ 2 სიმბოლო"
        onChange={cvChangeHandler.positionChangeHandler}
        value={cvData.enteredPosition}
        isValid={cvIsValid.positionIsValid}
        placeholder="დეველოპერი, დიზაინერი, ა.შ."
      />
      <Input
        label="დამსაქმებელი"
        valid="მინიმუმ 2 სიმბოლო"
        onChange={cvChangeHandler.employerChangeHandler}
        value={cvData.enteredEmployer}
        isValid={cvIsValid.employerIsValid}
        placeholder="დამსაქმებელი"
        style={{ marginTop: "30px" }}
      />

      <div className={classes.formgrid}>
        <InputDate
          label="დაწყების რიცხვი"
          onChange={cvChangeHandler.startingDateHandler}
          value={cvData.enteredStartingDate}
          isValid={cvIsValid.startingDateIsValid}
        />
        <InputDate
          label="დამთავრების რიცხვი"
          onChange={cvChangeHandler.endDateHandler}
          value={cvData.enteredEndDate}
          isValid={cvIsValid.endDateIsValid}
        />
      </div>
      <InputArea
        label="აღწერა"
        rows="5"
        placeholder="როლი თანამდებობაზე და ზოგადი აღწერა"
      />
    </div>
  );
};

export default ExperienceFormInputs;
