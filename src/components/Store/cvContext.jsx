import React, { useState } from "react";
import useInput from "../hooks/use-input";
import { useNavigate } from "react-router-dom";

const cvContext = React.createContext({
  border: false,
  cvData: {},
  cvIsValid: {},
  cvChangeHandler: {},
  submitHandler: () => {},
});

export const CVContextProvider = (props) => {
  const [enteredBio, setEnteredBio] = useState("");
  const [enteredImage, setEnteredImage] = useState(null);
  const [border, setBorder] = useState(false);
  const navigate = useNavigate();
  const regexGeorgian = /^[\u10A0-\u10FF]+$/;
  const regexEmail = /^([A-Za-z0-9_\-\.])+\@([redberry])+\.(ge)$/;
  const regexMobile = /^(\+995)(79\d{7}|5\d{8})$/;

  const {
    value: enteredName,
    isValid: nameIsValid,
    valueChangeHandler: nameChangeHandler,
  } = useInput(
    (value) => regexGeorgian.test(value.trim()) && value.trim().length > 1
  );

  const {
    value: enteredLastname,
    isValid: lastnameIsValid,
    valueChangeHandler: lastnameChangeHandler,
  } = useInput(
    (value) => regexGeorgian.test(value.trim()) && value.trim().length > 1
  );

  const uploadChangeHandler = (e) => {
    const uploadImage = e.target.files[0];
    setEnteredImage(URL.createObjectURL(uploadImage));
  };

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    valueChangeHandler: emailChangeHandler,
  } = useInput((value) => regexEmail.test(value.trim()));

  const {
    value: enteredMobile,
    isValid: mobileIsValid,
    valueChangeHandler: mobileChangeHandler,
  } = useInput((value) => regexMobile.test(value.trim()));

  const {
    value: enteredPosition,
    isValid: positionIsValid,
    valueChangeHandler: positionChangeHandler,
  } = useInput((value) => value.trim().length > 1);

  const {
    value: enteredEmployer,
    isValid: employerIsValid,
    valueChangeHandler: employerChangeHandler,
  } = useInput((value) => value.trim().length > 1);

  const bioChangeHandler = (e) => {
    setEnteredBio(e.target.value);
  };

  const {
    value: enteredStartingDate,
    isValid: startingDateIsValid,
    valueChangeHandler: startingDateHandler,
  } = useInput((value) => value.trim().length !== 0);

  const {
    value: enteredEndDate,
    isValid: endDateIsValid,
    valueChangeHandler: endDateHandler,
  } = useInput((value) => value.trim().length !== 0);

  const checkValidationPersonal =
    nameIsValid &&
    lastnameIsValid &&
    emailIsValid &&
    mobileIsValid &&
    enteredImage;

  const submitHandler = (e) => {
    e.preventDefault();
    if (checkValidationPersonal) {
      navigate("/experience");
      setBorder(true);
    }
  };

  return (
    <cvContext.Provider
      value={{
        cvData: {
          enteredName,
          enteredLastname,
          enteredBio,
          enteredImage,
          enteredEmail,
          enteredMobile,
          enteredPosition,
          enteredEmployer,
          enteredStartingDate,
          enteredEndDate,
        },
        cvIsValid: {
          nameIsValid,
          lastnameIsValid,
          emailIsValid,
          mobileIsValid,
          positionIsValid,
          employerIsValid,
          startingDateIsValid,
          endDateIsValid,
        },
        cvChangeHandler: {
          nameChangeHandler,
          lastnameChangeHandler,
          bioChangeHandler,
          uploadChangeHandler,
          emailChangeHandler,
          mobileChangeHandler,
          positionChangeHandler,
          employerChangeHandler,
          startingDateHandler,
          endDateHandler,
        },
        submitHandler,
        border,
      }}
    >
      {props.children}
    </cvContext.Provider>
  );
};

export default cvContext;
