import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const cvContext = React.createContext({
  cvData: {},
  cvIsValid: {},
  cvChangeHandler: {},
});

export const CVContextProvider = (props) => {
  const [degrees, setDegress] = useState({});
  const [isSubmit, setIsSubmit] = useState(
    localStorage.getItem("submit") || ""
  );
  const [isSubmitExp, setIsSubmitExp] = useState(
    localStorage.getItem("submitExp") || ""
  );
  const navigate = useNavigate();
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
  const [personal, setPersonal] = useState({
    name: "",
    surname: "",
    email: "",
    mobile: "",
    image: "",
    bio: "",
    isValid: {
      name: false,
      surname: false,
      email: false,
      mobile: false,
      image: false,
    },
  });
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
    const savedPersonal = JSON.parse(localStorage.getItem("personal"));
    if (savedPersonal) {
      setPersonal(savedPersonal);
    }
    getData();
  }, []);

  useEffect(() => {
    localStorage.setItem("border", border);
    localStorage.setItem("expSize", addExpSize);
    localStorage.setItem("eduSize", addEduSize);
    localStorage.setItem("submit", isSubmit);
    localStorage.setItem("submitExp", isSubmitExp);
    localStorage.setItem("personal", JSON.stringify(personal));
  }, [border, addExpSize, addEduSize, isSubmit, isSubmitExp, personal]);

  const getData = async () => {
    const response = await fetch(
      "https://resume.redberryinternship.ge/api/degrees"
    );
    const data = await response.json();
    setDegress(data);
  };

  const checkValidationPersonal =
    personal.isValid.name &&
    personal.isValid.surname &&
    personal.isValid.email &&
    personal.isValid.mobile;

  const submitHandlerPersonal = (e) => {
    e.preventDefault();
    localStorage.setItem("personal", JSON.stringify(personal));
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

  const addExp = (e, add) => {
    e.preventDefault();
    const updateExp = [...experience, add];
    setExperience(updateExp);
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
      setIsSubmitExp("true");
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

  const addEdu = (e, add) => {
    e.preventDefault();
    const updateEdu = [...education, add];
    setEducation(updateEdu);
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

  const handleSubmit = async () => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(personal)) {
      formData.append(key, value);
    }
    try {
      const response = await fetch(
        "https://resume.redberryinternship.ge/api/cvs",
        {
          method: "POST",
          headers: {
            accept: "application/json",
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log(error);
        throw new Error(error.message);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const submitHandlerEdu = async (e) => {
    e.preventDefault();
    const trueArr = submitArrEdu.filter((item) => item === true);
    const falseArr = submitArrEdu.filter((item) => item === false);
    const emptyArr = submitArrEdu.filter((item) => item === "");

    if (trueArr.length > 0 && falseArr.length === 0 && emptyArr.length === 0) {
      handleSubmit();
      navigate("/cv");
      setIsSubmit("true");
    }
  };

  return (
    <cvContext.Provider
      value={{
        cvData: {
          personal,
          experience,
          education,
        },
        cvIsValid: {},
        cvChangeHandler: {
          setPersonal,
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
        isSubmitExp,
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
