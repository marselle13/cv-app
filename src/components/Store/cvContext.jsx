import React, { useEffect, useState } from "react";
import useInput from "../hooks/use-input";
import { useNavigate } from "react-router-dom";

const cvContext = React.createContext({
  border: false,
  cvData: {},
  cvIsValid: {},
  cvChangeHandler: {},
  submitHandlerPersonal: () => {},
  addMoreHandler: () => {},
});

export const CVContextProvider = (props) => {
  const [enteredBio, setEnteredBio] = useState("");
  const [enteredImage, setEnteredImage] = useState(null);
  const [border, setBorder] = useState(false);
  const [selectInput, setSelectInput] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [degrees, setDegress] = useState({});

  const navigate = useNavigate();
  const regexGeorgian = /^[\u10A0-\u10FF]+$/;
  const regexEmail = /^([A-Za-z0-9_\-\.])+\@([redberry])+\.(ge)$/;
  const regexMobile = /^(\+995)(79\d{7}|5\d{8})$/;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch(
      "https://resume.redberryinternship.ge/api/degrees"
    );
    const data = await response.json();
    setDegress(data);
  };

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

  const submitHandlerPersonal = (e) => {
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
      description: "",
      isValid: {
        position: false,
        employer: false,
        startDate: false,
        endDate: false,
        description: false,
      },
    },
  ]);

  const expHandler = (index, field, value) => {
    const updateForms = [...experience];
    updateForms[index][field] = value;
    updateForms[index].isValid = isValidExp(experience[index]);
    setExperience(updateForms);
  };

  const isValidExp = (form) => ({
    position: form.position.trim().length > 1,
    employer: form.employer.trim().length > 1,
    startDate: form.startDate.length !== 0,
    endDate: form.endDate.length !== 0,
    description: form.description.length !== 0,
  });

  const addExp = (e) => {
    e.preventDefault();
    setExperience([
      ...experience,
      {
        position: "",
        employer: "",
        startDate: "",
        endDate: "",
        description: "",
        isValid: {
          position: false,
          employer: false,
          startDate: false,
          endDate: false,
          description: false,
        },
      },
    ]);
  };

  const submitArrExp = experience.map((exp, index) => {
    const submitIsValidExp =
      experience[index].isValid.position &&
      experience[index].isValid.employer &&
      experience[index].isValid.startDate &&
      experience[index].isValid.endDate &&
      experience[index].isValid.description;

    const { position, employer, startDate, endDate, description } = exp;
    if (position || employer || startDate || endDate || description) {
      return submitIsValidExp;
    }
  });

  const submitHandlerExp = (e) => {
    e.preventDefault();
    const trueArr = submitArrExp.filter((item) => item === true);
    const falseArr = submitArrExp.filter((item) => item === false);
    submitArrExp.forEach((item) => {
      if (trueArr.length > 0 && falseArr.length === 0) {
        navigate("/education");
      }
    });
  };

  const selectHandler = () => {
    setIsVisible((prev) => !prev);
  };

  const onOptionClicked = (value) => () => {
    setSelectInput(value);
    setIsVisible(false);
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
          selectInput,
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
          selectHandler,
        },
        border,
        addExp,
        degrees,
        onOptionClicked,
        isVisible,
        submitHandlerPersonal,
        submitHandlerExp,
        submitArrExp,
      }}
    >
      {props.children}
    </cvContext.Provider>
  );
};

export default cvContext;
