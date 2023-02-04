import React, { useState } from "react";
import useInput from "../hooks/use-input";

const cvContext = React.createContext({
  cvData: {},
  cvIsValid: {},
  cvChangeHandler: {},
});

export const CVContextProvider = (props) => {
  const [enteredBio, setEnteredBio] = useState("");
  const [image, setImage] = useState(null);
  const [enteredImage, setEnteredImage] = useState(null);
  const regexGeorgian = /^[\u10A0-\u10FF]+$/;
  const regexEmail = /^([A-Za-z0-9_\-\.])+\@([redberry])+\.(ge)$/;
  const regexMobile = /^(\+995)(79\d{7}|5\d{8})$/;
  const {
    value: enteredName,
    isValid: nameIsValid,
    valueChangeHandler: nameChangeHandler,
  } = useInput((value) => regexGeorgian.test(value) && value.trim().length > 1);
  const {
    value: enteredLastname,
    isValid: lastnameIsValid,
    valueChangeHandler: lastnameChangeHandler,
  } = useInput((value) => regexGeorgian.test(value) && value.trim().length > 1);
  const {
    value: enteredEmail,
    isValid: emailIsValid,
    valueChangeHandler: emailChangeHandler,
  } = useInput((value) => regexEmail.test(value));
  const {
    value: enteredMobile,
    isValid: mobileIsValid,
    valueChangeHandler: mobileChangeHandler,
  } = useInput((value) => regexMobile.test(value));

  const bioChangeHandler = (e) => {
    setEnteredBio(e.target.value);
  };

  const uploadChangeHandler = (e) => {
    const uploadImage = e.target.files[0];
    setImage(uploadImage);
    setEnteredImage(URL.createObjectURL(uploadImage));
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
        },
      }}
    >
      {props.children}
    </cvContext.Provider>
  );
};

export default cvContext;
