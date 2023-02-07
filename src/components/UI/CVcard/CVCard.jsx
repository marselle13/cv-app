import classes from "./CVCard.module.css";

const CVCard = (props) => {
  const checkChange = props.check2 === "true" || props.check2 === true;
  const checkSubmit = props.check3 === "true" || props.check3 === true;

  return (
    <div
      className={`${!props.check1 && classes.hidden} ${
        (props.check1 && checkChange && classes.borderBottom) ||
        (checkSubmit && classes.borderBottom)
      }`}
      key={props.index}
    >
      <div className={classes.workDiv} key={props.index}>
        <p> {props.info1}</p>
        {props.info1 && props.info2 && `,`}
        <p>&nbsp;{props.info2}</p>
      </div>
      <div className={classes.dateDiv}>
        <em> {props.date1}</em>
        {props.date2 && " - "}
        <em>{props.date2}</em>
      </div>
      <div className={classes.des}>
        <p>{props.description}</p>
      </div>
    </div>
  );
};

export default CVCard;
