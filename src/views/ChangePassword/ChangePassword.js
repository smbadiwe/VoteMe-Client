import React from "react";
import BaseComponent from "../BaseComponent";
import { Redirect } from "react-router-dom";
import { InputErrorInfo } from "../common";
import { logout } from "../common/AuthService";
import validator from "validator";
import { isValid } from "../common/utils";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";

class ChangePassword extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      password2: "",
      errors: { password: "", password2: "" },
      apiError: "",
      showApiError: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.validateFields()) {
      //TODO: Call server to change password
      logout();
      this.setState({ redirect: true });
    }
  }

  handleCancel(event) {
    event.preventDefault();
    this.setState({ cancel: true });
  }

  validateFields(field) {
    const errors = this.state.errors;
    const doAll = !field || field === "*";

    if (doAll || field === "password") {
      errors.password = "";
      if (validator.isEmpty(this.state.password)) errors.password += "Password is required. ";
    }

    if (doAll || field === "password2") {
      errors.password2 = "";
      if (validator.isEmpty(this.state.password2))
        errors.password2 += "Repeat password is required. ";
      else if (this.state.password !== this.state.password2)
        errors.password2 += "Repeat password does not match with the password entered. ";
    }

    return isValid(this, errors, doAll, field);
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }
    if (this.state.cancel) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className="app align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h1>Change Password</h1>
                  <Alert color="danger" isOpen={this.state.showApiError}>
                    {this.state.apiError}
                  </Alert>
                  <p className="text-muted">Change your password</p>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="password"
                      placeholder="Password"
                      name="password"
                      size="lg"
                      onChange={this.handleInputChange}
                    />
                    <InputErrorInfo
                      input="password"
                      info={this.state.errors.password}
                      show={this.state.errors.password.length > 0}
                    />
                  </InputGroup>
                  <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="password"
                      placeholder="Repeat password"
                      name="password2"
                      size="lg"
                      onChange={this.handleInputChange}
                    />
                    <InputErrorInfo
                      input="password2"
                      info={this.state.errors.password2}
                      show={this.state.errors.password2.length > 0}
                    />
                  </InputGroup>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button color="success" size="lg" block onClick={this.handleSubmit}>
                        <span>Change Password</span>
                      </Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button color="default" size="lg" block onClick={this.handleCancel}>
                        <span>Cancel</span>
                      </Button>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ChangePassword;
