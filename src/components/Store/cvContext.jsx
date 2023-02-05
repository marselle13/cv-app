import React, { useState } from "react";
import useInput from "../hooks/use-input";
import { useNavigate } from "react-router-dom";

const cvContext = React.createContext({
  border: false,
  cvData: {},
  cvIsValid: {},
  cvChangeHandler: {},
  submitHandler: () => {},
  addMoreHandler: () => {},
  expHandler: () => {},
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

  const bioChangeHandler = (e) => {
    setEnteredBio(e.target.value);
  };

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

  const [experience, setExperience] = useState([
    {
      position: "",
      employer: "",
      startDate: "",
      endDate: "",
      errors: {
        position: false,
        employer: false,
        startDate: false,
        endDate: false,
      },
    },
  ]);

  const expHandler = (index, field, value) => {
    const updateForms = [...experience];
    updateForms[index][field] = value;
    updateForms[index].errors = isValidExp(experience[index]);
    setExperience(updateForms);
  };

  const isValidExp = (form) => {
    console.log(form.startDate);
    let valid = {
      position: false,
      employer: false,
      startDate: false,
      endDate: false,
    };
    if (form.position.trim().length > 1) {
      valid.position = true;
    } else {
      valid.position = false;
    }

    if (form.employer.trim().length > 1) {
      valid.employer = true;
    } else {
      valid.employer = false;
    }

    if (form.startDate.length !== 0) {
      valid.startDate = true;
    } else {
      valid.startDate = false;
    }

    if (form.endDate.length !== 0) {
      valid.endDate = true;
    } else {
      valid.endDate = false;
    }

    return valid;
  };
  const addExp = (e) => {
    e.preventDefault();
    setExperience([
      ...experience,
      {
        position: "",
        employer: "",
        startDate: "",
        endDate: "",
        errors: {
          position: false,
          employer: false,
          startDate: false,
          endDate: false,
        },
      },
    ]);
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
          experience,
        },
        cvIsValid: {
          nameIsValid,
          lastnameIsValid,
          emailIsValid,
          mobileIsValid,
        },
        cvChangeHandler: {
          nameChangeHandler,
          lastnameChangeHandler,
          bioChangeHandler,
          uploadChangeHandler,
          emailChangeHandler,
          mobileChangeHandler,
          expHandler,
        },
        addExp,
        submitHandler,
        border,
      }}
    >
      {props.children}
    </cvContext.Provider>
  );
};

export default cvContext;
