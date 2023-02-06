import FormCard from "../UI/FormCard/FormCard";
import CV from "../CV/CV";
import ExperienceForm from "./ExperienceForm";

const Experience = () => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <FormCard label="გამოცდილება" number="2">
          <ExperienceForm />
        </FormCard>

        <CV />
      </div>
    </div>
  );
};
export default Experience;
