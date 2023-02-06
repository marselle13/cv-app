import FormCard from "../UI/FormCard/FormCard";
import PersonalForm from "./PersonalForm";
import CV from "../CV/CV";

const Personal = () => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <FormCard label="პირადი ინფო" number="1">
          <PersonalForm />
          
        </FormCard>
        <CV />
      </div>
    </div>
  );
};

export default Personal;
