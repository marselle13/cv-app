import { useContext } from "react";
import cvContext from "../Store/cvContext";
import ButtonContainer from "../UI/FormCard/ButtonContainer";
import classes from "./Education.module.css";
import EducationFormInputs from "./EducationFormInputs";

const EducationForm = () => {
  const ctx = useContext(cvContext);
  const education = {
    school: "",
    select: {
      degrees: "",
      isSelected: false,
    },
    endDate: "",
    description: "",
    isValid: {
      school: false,
      endDate: false,
      description: false,
    },
  };

  return (
    <form
      className={classes.education}
      style={{ paddingBottom: ctx.addEduSize && "65px" }}
      onSubmit={ctx.submitHandlerEdu}
    >
      <EducationFormInputs />
      <ButtonContainer
        back="/experience"
        add={(e) => ctx.addEdu(e, education)}
        label="სხვა სასწავლებლის დამატება"
      />
    </form>
  );
};

export default EducationForm;
