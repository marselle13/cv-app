import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const cvContext = React.createContext({
  cvData: {},
  cvChangeHandler: {},
});

export const CVContextProvider = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showExpArr, setShowExpArr] = useState([]);
  const [degrees, setDegress] = useState({});
  const [postData, setPostData] = useState("");
  const [tab, setTab] = useState(false);
  const [emptyPersonal, setEmptyPersonal] = useState(false);
  const [emptyExperience, setEmptyExperience] = useState(false);
  const [isSubmit, setIsSubmit] = useState(
    localStorage.getItem("submit") || ""
  );
  const [isSubmitExp, setIsSubmitExp] = useState(
    localStorage.getItem("submitExp") || ""
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
  useEffect(() => {
    if (location.pathname === "/cv") {
      localStorage.removeItem("personal");
      localStorage.removeItem("experience");
      localStorage.removeItem("education");
      localStorage.removeItem("border");
    }
  }, [location.pathname]);

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

    if (!checkValidationPersonal) {
      setEmptyPersonal(true);
    }
  };

  const expHandler = async (index, field, value) => {
    const updateForms = [...experience];
    if (field === "employer") {
      value = value.replace(/[^\p{L}\p{N}\p{Z}]+/gu, "");
    }
    updateForms[index][field] = value;
    updateForms[index].isValid = isValidExp(experience[index]);
    const { position, employer, start_date, due_date, description } =
      updateForms[index];
    const submitExp = await submitArrFunction();
    const falseArr = submitExp.filter((item) => item === false);
    const trueArr = submitExp.filter((item) => item === true);
    const show = submitExp.filter((item) => item === true || item === false);
    setShowExpArr(show);
    const formChecker =
      position && employer && start_date && due_date && description;
    if (formChecker && falseArr.length === 0) {
      setEmptyExperience(false);
    }
    if (!formChecker && trueArr.length > 0 && falseArr.length === 0) {
      setEmptyExperience(false);
    }
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

  const submitArrFunction = async () => {
    return Promise.all(
      experience.map((exp) => {
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
      })
    );
  };

  const submitHandlerExp = async (e) => {
    e.preventDefault();
    const submitArrExp = await submitArrFunction();
    const trueArr = submitArrExp.filter((item) => item === true);
    const falseArr = submitArrExp.filter((item) => item === false);

    if (falseArr.length > 0 || (trueArr.length && falseArr.length) === 0) {
      setEmptyExperience(true);
    }

    if (trueArr.length > 0 && falseArr.length === 0) {
      setEmptyExperience(false);
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
        setIsSubmit("true");
        setTab(true);
        navigate("/cv");
      })
      .catch((error) => {
        setIsSubmit("");
        setTab(false);
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

        border,
        addExp,
        addExpSize,
        addEdu,
        addEduSize,
        degrees,
        emptyExperience,
        emptyPersonal,
        isSubmit,
        isSubmitExp,
        onOptionClicked,
        showExpArr,
        submitHandlerEdu,
        submitHandlerExp,
        submitHandlerPersonal,
        submitArrEdu,
        setTab,
        tab,
      }}
    >
      {props.children}
    </cvContext.Provider>
  );
};

export default cvContext;
