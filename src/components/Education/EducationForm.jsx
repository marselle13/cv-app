import { useContext } from "react";
import cvContext from "../Store/cvContext";
import ButtonContainer from "../UI/FormCard/ButtonContainer";
import classes from "./Education.module.css";
import EducationFormInputs from "./EducationFormInputs";

const EducationForm = () => {
  const ctx = useContext(cvContext);
  const education = {
    institute: "",
    degree_id: null,
    select: {
      degree: "",
      isSelected: false,
    },
    due_date: "",
    description: "",
    isValid: {
      institute: false,
      degree: false,
      due_date: false,
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
