import { useContext } from "react";
import cvContext from "../Store/cvContext";
import classes from "./ExpCV.module.css";

const ExpCV = () => {
  const ctx = useContext(cvContext);
  const { cvData } = ctx;

  return (
    <div className={classes.expDiv}>
      <h4>გამოცდილება</h4>
      {cvData.experience.map((exp, index) => {
        const expCheck =
          cvData.experience[index].position ||
          cvData.experience[index].employer ||
          cvData.experience[index].startDate ||
          cvData.experience[index].endDate ||
          cvData.experience[index].description;

        return (
          <div
            className={
              cvData.experience.length !== 0 && expCheck && classes.borderBottom
            }
            key={index}
          >
            <div className={classes.workDiv}>
              <p> {exp.position}</p>
              {exp.position && exp.employer && `,`}
              <p>&nbsp;{exp.employer}</p>
            </div>
            <div className={classes.dateDiv}>
              <em> {exp.startDate}</em>
              {exp.startDate && " - "}
              <em>{exp.endDate}</em>
            </div>
            <div>
              <p>{exp.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ExpCV;
