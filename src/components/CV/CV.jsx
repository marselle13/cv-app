import PersonalCV from "./PersonalCV";
import ExpCV from "./ExpCV";
import EduCV from "./EduCV";
import { useContext } from "react";
import cvContext from "../Store/cvContext";
import CVContainer from "../UI/CVcard/CVContainer";

const CV = () => {
  const { cvData } = useContext(cvContext);
  const { personal } = cvData;

  return (
    <CVContainer>
      <PersonalCV
        name={personal.name}
        surname={personal.surname}
        email={personal.email}
        phone_number={personal.phone_number}
        bio={personal.bio}
        image={personal.image}
      />
      <ExpCV experience={cvData.experience} />
      <EduCV education={cvData.education} />
    </CVContainer>
  );
};

export default CV;
