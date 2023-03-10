import classes from "./InputUpload.module.css";

const InputUpload = (props) => {
  return (
    <div className={classes.uploadDiv}>
      <label
        htmlFor="inputDiv"
        className={`${classes.uploadLabel} ${
          props.empty && !props.isValid && classes.errorLabel
        }`}
      >
        პირადი ფოტოს ატვირთვა
      </label>
      <div className={classes.inputDiv}>
        <label htmlFor="file-input">ატვირთვა</label>

        <input
          type="file"
          style={{ display: "none" }}
          id="file-input"
          onChange={props.onChange}
          accept="image/png, image/jpeg"
          value={props.value}
        />
      </div>
    </div>
  );
};

export default InputUpload;
