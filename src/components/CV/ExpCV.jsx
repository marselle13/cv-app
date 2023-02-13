import { useContext } from "react";
import { useLocation } from "react-router-dom";
import cvContext from "../Store/cvContext";
import CVCard from "../UI/CVcard/CVCard";
import classes from "./ExpCV.module.css";

const ExpCV = (props) => {
  const { addExpSize, isSubmitExp, cvData } = useContext(cvContext);
  const location = useLocation();
  let show = [];

  return (
    <div className={classes.expDiv}>
      {show.length !== 0 && location.pathname !== "/cv" && <h4>გამოცდილება</h4>}
      {cvData.postData && location.pathname === "/cv" && <h4>გამოცდილება</h4>}

      {props.experience &&
        props.experience.map((exp, index) => {
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
              check2={addExpSize}
              check3={isSubmitExp}
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
