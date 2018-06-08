import React from "react";

const InputErrorInfo = props => {
  return (
    <span
      id={`${props.input}-val`}
      className="alert alert-danger form-control"
      style={{
        display: props.show === true || props.show === "true" ? "block" : "none",
        width: "100%"
      }}
    >
      {props.info}
    </span>
  );
};

export default InputErrorInfo;
