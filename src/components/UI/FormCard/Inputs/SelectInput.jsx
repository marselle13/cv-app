import { useContext } from "react";
import classes from "./SelectInput.module.css";
import dropdown from "../../../../assets/dropdown.png";
import cvContext from "../../../Store/cvContext";

const SelectInput = (props) => {
  const ctx = useContext(cvContext);
  const { cvData, cvChangeHandler } = ctx;

  return (
    <div className={classes.selectDiv}>
      <label>ხარისხი</label>
      <div
        className={`${classes.selectContainer} ${
          cvData.education[props.index].select.degrees && classes.passBorder
        }`}
        onClick={() => cvChangeHandler.selectHandler(props.index)}
      >
        <span
          className={
            cvData.education[props.index].select.degrees ? classes.passText : ""
          }
        >
          {cvData.education[props.index].select.degrees || "აირჩიე ხარისხი"}
        </span>
        <img src={dropdown} alt="" />
      </div>
      {cvData.education[props.index].select.isSelected && (
        <div className={classes.dropDownContainer}>
          <ul>
            {ctx.degrees.map((option) => (
              <li
                onClick={ctx.onOptionClicked(
                  option.id,
                  option.title,
                  props.index
                )}
                key={option.id}
              >
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
