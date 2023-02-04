import classes from "./InputUpload.module.css";

const InputUpload = () => {
  return (
    <div className={classes.uploadDiv}>
      <label htmlFor="inputDiv" className={classes.uploadLabel}>პირადი ფოტოს ატვირთვა</label>
      <div className={classes.inputDiv}>
        <label htmlFor="file-input" > ატვირთვა</label>
        <input type="file" style={{ display: "none" }} id="file-input" />
      </div>
    </div>
  );
};

export default InputUpload;
