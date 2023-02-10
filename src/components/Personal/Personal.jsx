import FormCard from "../UI/FormCard/FormCard";
import PersonalForm from "./PersonalForm";
import CV from "../CV/CV";
import { useEffect } from "react";

const Personal = () => {
  useEffect(() => {
    localStorage.removeItem("firstReload");
  }, []);

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
