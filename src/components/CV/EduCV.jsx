import cvContext from "../Store/cvContext";
import classes from "./EduCV.module.css";
import { useContext } from "react";
import CVCard from "../UI/CVcard/CVCard";
const EduCV = (props) => {
  const { cvData, submitArrEdu, addEduSize, isSubmit } = useContext(cvContext);
  const show = submitArrEdu.filter((item) => item === true || item === false);

  return (
    <div className={classes.eduDiv}>
      {show.length !== 0 && <h4>განათლება</h4>}

      {(props.education || cvData.postData) &&
        props.education.map((edu, index) => {
          const eduCheck =
            edu.institute ||
            edu.select.degree ||
            edu.due_date ||
            edu.description;

          return (
            <CVCard
              key={index}
              check1={eduCheck}
              check2={addEduSize}
              check3={isSubmit}
              info1={edu.institute}
              info2={edu.degree || edu.select.degree}
              date1={edu.due_date}
              description={edu.description}
            />
          );
        })}
    </div>
  );
};
export default EduCV;
