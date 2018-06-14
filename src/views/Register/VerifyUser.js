import React from "react";
import RegisterService from "./Register.service";
import { Link, Redirect } from "react-router-dom";
import qs from "query-string";

export default class VerifyUser extends React.Component {
  constructor(props) {
    super(props);
    const queryString = this.props.location.search;
    if (queryString) {
      this.token = qs.parse(queryString).token;
    } else {
      this.token = null;
    }
    this.state = {
      kill: this.token === null || this.token === "",
      loading: true,
      redirect: false,
      error: ""
    };
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }
    if (this.state.kill) {
      return <h5>Bad request. Don't try this again, buddy.</h5>;
    }
    if (this.state.loading) {
      return <h5>Laoding...</h5>;
    }
    return (
      <div>
        <h4>
          Something went wrong. <Link to={this.props.location}>Click here to try again</Link>
        </h4>
        <h6>{this.state.error}</h6>
      </div>
    );
  }

  componentDidMount() {
    if (!this.state.kill) {
      new RegisterService()
        .verifyUser(this.token)
        .then(res => {
          if (res.status) {
            this.setState({ redirect: true, loading: false });
          } else {
            this.setState({ redirect: false, loading: false, error: res.message });
          }
        })
        .catch(err => {
          this.setState({ redirect: false, loading: false, error: err.message });
          console.log(err);
        });
    }
  }
}
