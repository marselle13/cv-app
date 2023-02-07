import { useContext } from "react";
import cvContext from "../Store/cvContext";
import CVCard from "../UI/CVcard/CVCard";
import classes from "./ExpCV.module.css";

const ExpCV = () => {
  const ctx = useContext(cvContext);
  const { cvData } = ctx;
  const show = ctx.submitArrExp.filter(
    (item) => item === true || item === false
  );

  return (
    <div className={classes.expDiv}>
      {show.length !== 0 && <h4>გამოცდილება</h4>}

      {cvData.experience.map((exp, index) => {
        const expCheck =
          cvData.experience[index].position ||
          cvData.experience[index].employer ||
          cvData.experience[index].startDate ||
          cvData.experience[index].endDate ||
          cvData.experience[index].description;

        return (
          <CVCard
            key={index}
            check1={expCheck}
            check2={ctx.addExpSize}
            info1={exp.position}
            info2={exp.employer}
            date1={exp.startDate}
            date2={exp.endDate}
            description={exp.description}
          />
        );
      })}
    </div>
  );
};

export default ExpCV;
