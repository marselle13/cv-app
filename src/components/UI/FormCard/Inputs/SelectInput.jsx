import { useContext } from "react";
import classes from "./SelectInput.module.css";
import dropdown from "../../../../assets/dropdown.png";
import cvContext from "../../../Store/cvContext";

const SelectInput = (props) => {
  const { cvData, cvChangeHandler, degrees, onOptionClicked } =
    useContext(cvContext);

  return (
    <div className={classes.selectDiv}>
      <label
        className={
          !cvData.education[props.index].isValid.degree && props.empty
            ? classes.errorLabel
            : ""
        }
      >
        ხარისხი
      </label>
      <div
        className={`${classes.selectContainer} ${
          cvData.education[props.index].isValid.degree ? classes.passBorder : ""
        } ${
          props.empty &&
          !cvData.education[props.index].isValid.degree &&
          classes.errorBorder
        }`}
        onClick={() => cvChangeHandler.selectHandler(props.index)}
      >
        <span
          className={
            cvData.education[props.index].select.degree ? classes.passText : ""
          }
        >
          {cvData.education[props.index].select.degree || "აირჩიე ხარისხი"}
        </span>
        <img src={dropdown} alt="" />
      </div>
      {cvData.education[props.index].select.isSelected && (
        <div className={classes.dropDownContainer}>
          <ul>
            {degrees &&
              degrees.map((option) => (
                <li
                  onClick={onOptionClicked(
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
