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
          exp.position ||
          exp.employer ||
          exp.start_date ||
          exp.due_date ||
          exp.description;

        return (
          <CVCard
            key={index}
            check1={expCheck}
            check2={ctx.addExpSize}
            check3={ctx.isSubmitExp}
            info1={exp.position}
            info2={exp.employer}
            date1={exp.start_date}
            date2={exp.due_date}
            description={exp.description}
          />
        );
      })}
    </div>
  );
};

export default ExpCV;
