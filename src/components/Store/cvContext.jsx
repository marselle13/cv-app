import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const cvContext = React.createContext({
  cvData: {},
  cvChangeHandler: {},
});

export const CVContextProvider = (props) => {
  const [degrees, setDegress] = useState({});
  const [postData, setPostData] = useState({});
  const [tab, setTab] = useState(false);
  const [isSubmit, setIsSubmit] = useState(
    localStorage.getItem("submit") || ""
  );
  const [isSubmitExp, setIsSubmitExp] = useState(
    localStorage.getItem("submitExp") || ""
  );
  const navigate = useNavigate();
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
      image: false,
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
      degree_id: null,
      select: {
        degree: "",
        isSelected: false,
      },
      due_date: "",
      description: "",
      isValid: {
        institute: false,
        degree: false,
        due_date: false,
        description: false,
      },
    },
  ]);

  useEffect(() => {
    const savedPersonal = JSON.parse(localStorage.getItem("personal"));
    if (savedPersonal) {
      setPersonal(savedPersonal);
    }
    const savedExperience = JSON.parse(localStorage.getItem("experience"));
    if (savedExperience) {
      setExperience(savedExperience);
    }
    const savedEducation = JSON.parse(localStorage.getItem("education"));
    if (savedEducation) {
      setEducation(savedEducation);
    }
    const storedData = JSON.parse(localStorage.getItem("postData"));
    if (storedData) {
      setPostData(storedData);
    }
    getData();
  }, []);
  useEffect(() => {
    localStorage.setItem("border", border);
    localStorage.setItem("expSize", addExpSize);
    localStorage.setItem("eduSize", addEduSize);
    localStorage.setItem("submit", isSubmit);
    localStorage.setItem("submitExp", isSubmitExp);
  }, [border, addExpSize, addEduSize, isSubmit, isSubmitExp]);

  useEffect(() => {
    localStorage.setItem("personal", JSON.stringify(personal));
  }, [personal]);
  useEffect(() => {
    localStorage.setItem("experience", JSON.stringify(experience));
  }, [experience]);
  useEffect(() => {
    localStorage.setItem("education", JSON.stringify(education));
  }, [education]);
  useEffect(() => {
    localStorage.setItem("postData", JSON.stringify(postData));
  }, [postData]);

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
    personal.isValid.phone_number &&
    personal.isValid.image;

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
      exp.isValid.position &&
      exp.isValid.employer &&
      exp.isValid.start_date &&
      exp.isValid.due_date &&
      exp.isValid.description;

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
    setEducation((prev) => {
      const updateFormsEdu = [...prev];
      updateFormsEdu[index][field] = value;
      updateFormsEdu[index].isValid = isValidEdu(education[index]);

      return updateFormsEdu;
    });
  };

  const selectHandler = (index) => {
    const updateSelect = [...education];
    updateSelect[index].select.isSelected =
      !updateSelect[index].select.isSelected;
    setEducation(updateSelect);
  };

  const onOptionClicked = (id, value, index) => () => {
    setEducation((prev) => {
      const updateSelect = [...prev];
      updateSelect[index].degree_id = id;
      updateSelect[index].select.degree = value;
      updateSelect[index].isValid = isValidEdu(education[index]);
      updateSelect[index].select.isSelected =
        !updateSelect[index].select.isSelected;
      return updateSelect;
    });
  };

  const isValidEdu = (form) => ({
    institute: form.institute.trim().length > 1,
    degree: form.degree_id > 0,
    due_date: form.due_date.length !== 0,
    description: form.description.length !== 0,
  });

  const addEdu = (e, add) => {
    e.preventDefault();
    const updateEdu = [...education, add];
    setEducation(updateEdu);
    setAddEduSize(true);
  };

  const submitArrEdu = education.map((edu) => {
    let checkInputs = [];
    const submitIsValidEdu =
      edu.isValid.institute &&
      edu.isValid.due_date &&
      edu.isValid.description &&
      edu.isValid.degree;
    const { institute, degree_id, due_date, description } = edu;
    if (institute || degree_id || due_date || description) {
      checkInputs = submitIsValidEdu;
    }

    return checkInputs;
  });

  const submitHandlerEdu = async (e) => {
    e.preventDefault();
    const trueArr = submitArrEdu.filter((item) => item === true);
    const falseArr = submitArrEdu.filter((item) => item === false);

    if (trueArr.length > 0 && falseArr.length === 0) {
      handleSubmit();
      setIsSubmit("true");
      navigate("/cv");
    }
  };

  const pushToJSON = (array, arrayPush) => {
    const filteredExperience = array.filter((value) => {
      for (const key in value.isValid) {
        return value.isValid[key] === true;
      }
      return false;
    });
    filteredExperience.forEach((exp) => {
      arrayPush.push(exp);
    });
  };

  const handleSubmit = async () => {
    const blob = await axios.get(personal.image, { responseType: "blob" });
    const file = new File([blob.data], "File name", { type: "image/png" });

    const jsonData = {
      name: personal.name,
      image: file,
      surname: personal.surname,
      about_me: personal.bio,
      email: personal.email,
      phone_number: personal.phone_number,
      experiences: [],
      educations: [],
    };

    pushToJSON(experience, jsonData.experiences);
    pushToJSON(education, jsonData.educations);

    axios
      .post("https://resume.redberryinternship.ge/api/cvs", jsonData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      })
      .then((response) => {
        setPostData(response.data);
        setTab(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <cvContext.Provider
      value={{
        cvData: {
          personal,
          experience,
          education,
          postData,
        },
        cvChangeHandler: {
          setPersonal,
          expHandler,
          eduHandler,
          selectHandler,
        },
        tab,
        setTab,
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
