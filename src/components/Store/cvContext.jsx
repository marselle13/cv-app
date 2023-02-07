import React, { useEffect, useState } from "react";
import useInput from "../hooks/use-input";
import { useNavigate } from "react-router-dom";

const cvContext = React.createContext({
  cvData: {},
  cvIsValid: {},
  cvChangeHandler: {},
  submitHandlerPersonal: () => {},
  addMoreHandler: () => {},
});

export const CVContextProvider = (props) => {
  const [degrees, setDegress] = useState({});
  const [isSubmit, setIsSubmit] = useState(
    localStorage.getItem("submit") || ""
  );
  const navigate = useNavigate();
  const [enteredBio, setEnteredBio] = useState(
    localStorage.getItem("bio") || ""
  );
  const [enteredImage, setEnteredImage] = useState(
    localStorage.getItem("image") || ""
  );
  const [border, setBorder] = useState(localStorage.getItem("border") || "");
  const [addExpSize, setAddExpSize] = useState(
    localStorage.getItem("expSize") || false
  );
  const [addEduSize, setAddEduSize] = useState(
    localStorage.getItem("eduSize") || false
  );
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
  const [education, setEducation] = useState([
    {
      school: "",
      select: {
        degrees: "",
        isSelected: false,
      },
      endDate: "",
      description: "",
      isValid: {
        school: false,
        degrees: false,
        endDate: false,
        description: false,
      },
    },
  ]);
  const regexGeorgian = /^[\u10A0-\u10FF]+$/;
  const regexEmail = /^[a-zA-Z0-9._%+-]+@redberry\.ge$/;
  const regexMobile = /^(\+995)(79\d{7}|5\d{8})$/;

  useEffect(() => {
    localStorage.setItem("image", enteredImage);
    return () => {
      URL.revokeObjectURL(enteredImage);
    };
  }, [enteredImage]);

  useEffect(() => {
    const savedExperience = localStorage.getItem("experience");
    if (savedExperience) {
      const parsedExperience = JSON.parse(savedExperience);
      setExperience(parsedExperience);
    }
    const savedEducation = JSON.parse(localStorage.getItem("education"));
    if (savedEducation) {
      setEducation(savedEducation);
    }
    getData();
  }, []);

  useEffect(() => {
    localStorage.setItem("border", border);
    localStorage.setItem("expSize", addExpSize);
    localStorage.setItem("eduSize", addEduSize);
    localStorage.setItem("submit", isSubmit);
  }, [border, addExpSize, addEduSize, isSubmit]);

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
    "firstName",
    "",
    (value) => regexGeorgian.test(value.trim()) && value.trim().length > 1
  );

  const bioChangeHandler = (e) => {
    setEnteredBio(e.target.value);
    localStorage.setItem("bio", enteredBio);
  };

  const {
    value: enteredLastname,
    isValid: lastnameIsValid,
    valueChangeHandler: lastnameChangeHandler,
  } = useInput(
    "lastName",
    "",
    (value) => regexGeorgian.test(value.trim()) && value.trim().length > 1
  );
  const uploadChangeHandler = (e) => {
    const image = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setEnteredImage(URL.createObjectURL(image));
    };
    reader.readAsDataURL(image);
  };

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    valueChangeHandler: emailChangeHandler,
  } = useInput("email", "", (value) => regexEmail.test(value.trim()));

  const {
    value: enteredMobile,
    isValid: mobileIsValid,
    valueChangeHandler: mobileChangeHandler,
  } = useInput("mobile", "", (value) => regexMobile.test(value.trim()));

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
      setBorder("done");
    }
  };

  const expHandler = (index, field, value) => {
    const updateForms = [...experience];
    updateForms[index][field] = value;
    updateForms[index].isValid = isValidExp(experience[index]);
    setExperience(updateForms);
    localStorage.setItem("experience", JSON.stringify(experience));
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
    setAddExpSize(true);
  };

  const submitArrExp = experience.map((exp, index) => {
    let checkInputs = [];
    const submitIsValidExp =
      experience[index].isValid.position &&
      experience[index].isValid.employer &&
      experience[index].isValid.startDate &&
      experience[index].isValid.endDate &&
      experience[index].isValid.description;

    const { position, employer, startDate, endDate, description } = exp;
    if (position || employer || startDate || endDate || description) {
      checkInputs = submitIsValidExp;
    }
    return checkInputs;
  });

  const submitHandlerExp = (e) => {
    e.preventDefault();
    const trueArr = submitArrExp.filter((item) => item === true);
    const falseArr = submitArrExp.filter((item) => item === false);

    if (trueArr.length > 0 && falseArr.length === 0) {
      navigate("/education");
    }
  };

  const eduHandler = (index, field, value) => {
    const updateFormsEdu = [...education];
    updateFormsEdu[index][field] = value;
    updateFormsEdu[index].isValid = isValidEdu(education[index]);
    setEducation(updateFormsEdu);
    localStorage.setItem("education", JSON.stringify(education));
  };

  const selectHandler = (index) => {
    const updateSelect = [...education];
    updateSelect[index].select.isSelected =
      !updateSelect[index].select.isSelected;
    setEducation(updateSelect);
  };

  const onOptionClicked = (value, index) => () => {
    const updateSelect = [...education];
    updateSelect[index].select.degrees = value;
    setEducation(updateSelect);
    updateSelect[index].select.isSelected =
      !updateSelect[index].select.isSelected;
  };

  const isValidEdu = (form) => ({
    school: form.school.trim().length > 1,
    endDate: form.endDate.length !== 0,
    description: form.description.length !== 0,
  });

  const addEdu = (e) => {
    e.preventDefault();
    setEducation([
      ...education,
      {
        school: "",
        select: {
          degrees: "",
          isSelected: false,
        },
        endDate: "",
        description: "",
        isValid: {
          school: false,
          endDate: false,
          description: false,
        },
      },
    ]);
    setAddEduSize(true);
  };

  const submitArrEdu = education.map((edu, index) => {
    let eduUpdate = [];
    const submitIsValidEdu =
      education[index].isValid.school &&
      education[index].select.degrees &&
      education[index].isValid.endDate &&
      education[index].isValid.description;
    const { school, select, endDate, description } = edu;
    if (school || select.degrees || endDate || description) {
      eduUpdate = submitIsValidEdu;
    }
    return eduUpdate;
  });

  const submitHandlerEdu = (e) => {
    e.preventDefault();
    const trueArr = submitArrEdu.filter((item) => item === true);
    const falseArr = submitArrEdu.filter((item) => item === false);
    const emptyArr = submitArrEdu.filter((item) => item === "");

    if (trueArr.length > 0 && falseArr.length === 0 && emptyArr.length === 0) {
      navigate("/cv");
      setIsSubmit("true");
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
          experience,
          education,
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
          eduHandler,
          selectHandler,
        },
        border,
        addExp,
        addExpSize,
        addEdu,
        addEduSize,
        degrees,
        onOptionClicked,
        isSubmit,
        submitHandlerPersonal,
        submitHandlerExp,
        submitHandlerEdu,
        submitArrExp,
        submitArrEdu,
      }}
    >
      {props.children}
    </cvContext.Provider>
  );
};

export default cvContext;
