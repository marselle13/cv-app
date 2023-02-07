import cvContext from "../Store/cvContext";
import classes from "./EduCV.module.css";
import { useContext } from "react";
import CVCard from "../UI/CVcard/CVCard";
const EduCV = () => {
  const ctx = useContext(cvContext);
  const { cvData } = ctx;
  const show = ctx.submitArrEdu.filter(
    (item) => item === true || item === false || item === ""
  );

  return (
    <div className={classes.eduDiv}>
      {show.length !== 0 && <h4>განათლება</h4>}

      {cvData.education.map((edu, index) => {
        const eduCheck =
          cvData.education[index].school ||
          cvData.education[index].select.degrees ||
          cvData.education[index].endDate ||
          cvData.education[index].description;

        return (
          <CVCard
            key={index}
            check1={eduCheck}
            check2={ctx.addEduSize}
            info1={edu.school}
            info2={edu.select.degrees}
            date1={edu.endDate}
            description={edu.description}
          />
        );
      })}
    </div>
  );
};
export default EduCV;
