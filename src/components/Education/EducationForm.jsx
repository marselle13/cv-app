import { useContext } from "react";
import cvContext from "../Store/cvContext";
import ButtonContainer from "../UI/FormCard/ButtonContainer";
import classes from "./Education.module.css";
import EducationFormInputs from "./EducationFormInputs";

const EducationForm = () => {
  const ctx = useContext(cvContext);
  return (
    <form
      className={classes.education}
      style={{ paddingBottom: ctx.addEduSize && "65px" }}
      onSubmit={ctx.submitHandlerEdu}
    >
      <EducationFormInputs />
      <ButtonContainer
        back="/experience"
        add={ctx.addEdu}
        label="სხვა სასწავლებლის დამატება"
      />
    </form>
  );
};

export default EducationForm;
