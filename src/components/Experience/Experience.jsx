import FormCard from "../UI/FormCard/FormCard";
import CV from "../CV/CV";

const Experience = () => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <FormCard label="გამოცდილება" number="2"></FormCard>
        <CV />
      </div>
    </div>
  );
};
export default Experience;
