import React, { Component } from "react";
import validator from "validator";
import BaseComponent from "../BaseComponent";
import { InputErrorInfo } from "../common";
import { isValid } from "../common/utils";
import { Redirect } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";

export default class Register extends BaseComponent {
  constructor() {
    super();
    this.state = {
      redirect: false,
      email: "",
      username: "",
      password: "",
      password2: "",
      errors: { email: "", username: "", password: "", password2: "" }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.validateFields()) {
      this.setState({ redirect: true });
    }
  }

  validateFields(field) {
    const errors = this.state.errors;
    let doAll = !field || field === "*";

    if (doAll || field === "email") {
      errors.email = "";
      if (validator.isEmpty(this.state.email)) errors.email += "Email is required. ";
      else if (!validator.isEmail(this.state.email)) errors.email += "Invalid email address. ";
    }

    if (doAll || field === "username") {
      errors.username = "";
      if (validator.isEmpty(this.state.username)) errors.username += "Username is required. ";
    }

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
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <form onSubmit={this.handleSubmit}>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={this.handleInputChange}
                      />
                      <InputErrorInfo
                        input="username"
                        info={this.state.errors.username}
                        show={this.state.errors.username.length > 0}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="email"
                        placeholder="Email"
                        name="email"
                        autoComplete="email"
                        onChange={this.handleInputChange}
                      />
                      <InputErrorInfo
                        input="email"
                        info={this.state.errors.email}
                        show={this.state.errors.email.length > 0}
                      />
                    </InputGroup>
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
                        autoComplete="new-password"
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
                        autoComplete="new-password"
                        onChange={this.handleInputChange}
                      />
                      <InputErrorInfo
                        input="password2"
                        info={this.state.errors.password2}
                        show={this.state.errors.password2.length > 0}
                      />
                    </InputGroup>
                    <Button color="success" block type="submit">
                      Create Account
                    </Button>
                  </form>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook" block>
                        <span>facebook</span>
                      </Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter" block>
                        <span>twitter</span>
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
