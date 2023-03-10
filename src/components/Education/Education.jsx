import FormCard from "../UI/FormCard/FormCard";
import CV from "../CV/CV";
import EducationForm from "./EducationForm";

const Education = () => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <FormCard label="განათლება" number="3">
          <EducationForm />
        </FormCard>

        <CV />
      </div>
    </div>
  );
};

export default Education;
