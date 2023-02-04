import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isValid, setIsValid] = useState(false);

  const valueChangeHandler = (e) => {
    setEnteredValue(e.target.value);

    if (validateValue(e.target.value)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  return {
    value: enteredValue,
    isValid,
    valueChangeHandler,
  };
};

export default useInput;
