import React, { Component } from "react";
import ResetPasswordService from "./ResetPassword.service";
import { Redirect } from "react-router-dom";

class ResetPassword2 extends Component {
  render() {
    const token = this.props.match.params.token;
    if (!token) {
      throw new Error("We could not retrieve the reset key required to process this request.");
    }
    let result;
    new ResetPasswordService().resetPassword(token).then(res => {
      result = res;
    });

    if (result && result.status) {
      return <Redirect to={`/changepassword?email=${result.data.email}`} />;
    }

    throw new Error(result.message);
  }
}

export default ResetPassword2;
