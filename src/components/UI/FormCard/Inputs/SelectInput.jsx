import { useContext, useState } from "react";
import classes from "./SelectInput.module.css";
import dropdown from "../../../../assets/dropdown.png";
import cvContext from "../../../Store/cvContext";

const SelectInput = () => {
  const ctx = useContext(cvContext);
  const { cvChangeHandler } = ctx;
  const { cvData } = ctx;

  return (
    <div className={classes.selectDiv}>
      <label htmlFor="">ხარისხი</label>
      <div
        className={classes.selectContainer}
        onClick={cvChangeHandler.selectHandler}
      >
        <span className={cvData.selectInput && classes.select}>
          {cvData.selectInput || "აირჩიე ხარისხი"}
        </span>
        <img src={dropdown} alt="" />
      </div>
      {ctx.isVisible && (
        <div className={classes.dropDownContainer}>
          <ul>
            {ctx.degrees.map((option) => (
              <li onClick={ctx.onOptionClicked(option.title)} key={option.id}>
                {option.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectInput;
