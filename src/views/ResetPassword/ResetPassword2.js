import React from "react";
import BaseComponent from "../BaseComponent";
import ResetPasswordService from "./ResetPassword.service";
import { Link, Redirect } from "react-router-dom";

class ResetPassword2 extends BaseComponent {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const token = this.props.match.params.token;
    if (!token) {
      throw new Error("We could not retrieve the reset key required to process this request.");
    }
    new ResetPasswordService()
      .resetPassword(token)
      .then(result => {})
      .catch(err => {});
  }
}

export default ResetPassword2;
