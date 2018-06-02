import React, { Component } from "react";

export default class InputErrorInfo extends Component {
  render() {
    return (
      <span
        id={`${this.props.input}-val`}
        className="alert alert-danger form-control"
        style={{
          display: this.props.show === true || this.props.show === "true" ? "block" : "none",
          width: "100%"
        }}
      >
        {this.props.info}
      </span>
    );
  }
}
