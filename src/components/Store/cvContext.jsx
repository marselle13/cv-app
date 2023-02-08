import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const cvContext = React.createContext({
  cvData: {},
  cvIsValid: {},
  cvChangeHandler: {},
});

export const CVContextProvider = (props) => {
  const [data, setData] = useState({});
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
    phone_number: "",
    image: "",
    bio: "",
    isValid: {
      name: false,
      surname: false,
      email: false,
      mobile: false,
      phone_number: false,
    },
  });
  const [experience, setExperience] = useState([
    {
      position: "",
      employer: "",
      start_date: "",
      due_date: "",
      description: "",
      isValid: {
        position: false,
        employer: false,
        start_date: false,
        due_date: false,
        description: false,
      },
    },
  ]);
  const [education, setEducation] = useState([
    {
      institute: "",
      select: {
        degree_id: 0,
        degrees: "",
        isSelected: false,
      },
      due_date: "",
      description: "",
      isValid: {
        institute: false,
        degrees: false,
        due_date: false,
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
    const savedPersonal = JSON.parse(localStorage.getItem("personal"));
    if (savedPersonal) {
      setPersonal(savedPersonal);
    }
    const savedExperience = JSON.parse(localStorage.getItem("experience"));
    if (savedExperience) {
      setExperience(savedExperience);
      setData(savedExperience);
    }
    const savedEducation = JSON.parse(localStorage.getItem("education"));
    if (savedEducation) {
      setEducation(savedEducation);
    }
    getData();
  }, []);
  console.log(data);
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
    personal.isValid.phone_number;

  const submitHandlerPersonal = (e) => {
    e.preventDefault();
    localStorage.setItem("personal", JSON.stringify(personal));
    if (checkValidationPersonal) {
      navigate("/experience");
      setBorder("done");
    }
  };
  console.log(data);

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
    start_date: form.start_date.length !== 0,
    due_date: form.due_date.length !== 0,
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
      experience[index].isValid.start_date &&
      experience[index].isValid.due_date &&
      experience[index].isValid.description;

    const { position, employer, start_date, due_date, description } = exp;
    if (position || employer || start_date || due_date || description) {
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
    institute: form.institute.trim().length > 1,
    due_date: form.due_date.length !== 0,
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
      education[index].isValid.institute &&
      education[index].select.degrees &&
      education[index].isValid.due_date &&
      education[index].isValid.description;
    const { institute, select, due_date, description } = edu;
    if (institute || select.degrees || due_date || description) {
      eduUpdate = submitIsValidEdu;
    }
    return eduUpdate;
  });

  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    // const formData = new FormData();
    // const storedPersonal = JSON.parse(localStorage.getItem("personal"));
    // const storedExperience = JSON.parse(localStorage.getItem("experience"));
    // for (const [key, value] of Object.entries(storedPersonal)) {
    //   if (key !== "isValid") {
    //     formData.append(key, value);
    //   }
    // }
    const experienceArr = experience.map((exp) => exp);

    axios
      .post("https://resume.redberryinternship.ge/api/cvs", {
        name: personal.name,
        surname: personal.surname,
        image: personal.image,
        bio: personal.bio,
        email: personal.email,
        phone_number: personal.phone_number,
        experiences: [experience[0]],
        educations: [education[0]],
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        if (error.response.status === 422) {
          // Handle Unprocessable Entity (422) error
          console.error(error.response.data);
        } else {
          // Handle other errors
          console.error(error);
        }
      });
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
