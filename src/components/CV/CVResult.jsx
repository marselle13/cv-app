import classes from "./CV.module.css";
import close from "../../assets/close.png";
import { useContext } from "react";
import cvContext from "../Store/cvContext";
import BackLandingButton from "../UI/FormCard/BackLandingButton";
import CVContainer from "../UI/CVcard/CVContainer";
import PersonalCV from "./PersonalCV";
import ExpCV from "./ExpCV";
import EduCV from "./EduCV";

const CVResult = () => {
  const { cvData, tab, setTab } = useContext(cvContext);
  const { postData } = cvData;
  console.log(postData);

  return (
    <div className={classes.cvResult}>
      <BackLandingButton />
      <div className={classes.cvResultDiv}>
        <CVContainer>
          <PersonalCV
            name={postData?.name}
            surname={postData?.surname}
            email={postData?.email}
            phone_number={postData?.phone_number}
            bio={postData?.about_me}
            storage={postData?.image}
          />
          <ExpCV experience={postData.experiences} />
          <EduCV education={postData.educations} />
        </CVContainer>
      </div>
      <div className={`${classes.message} ${!tab && classes.close}`}>
        <div>
          <img src={close} alt="" onClick={() => setTab(false)} />
        </div>

        <h5>რეზიუმე წარმატებით გაიგზავნა 🎉</h5>
      </div>
    </div>
  );
};

export default CVResult;
