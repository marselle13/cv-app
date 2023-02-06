import { useState } from "react";

const useInput = (key, initialValue, validateValue) => {
  const [enteredValue, setEnteredValue] = useState(
    localStorage.getItem(key) || initialValue
  );

  const [isValid, setIsValid] = useState(validateValue(enteredValue));

  const valueChangeHandler = (e) => {
    setEnteredValue(e.target.value);
    localStorage.setItem(key, e.target.value);
    setIsValid(validateValue(e.target.value));
  };

  return {
    value: enteredValue,
    isValid,
    valueChangeHandler,
  };
};

export default useInput;
