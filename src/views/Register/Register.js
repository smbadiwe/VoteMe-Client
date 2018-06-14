import React from "react";
import validator from "validator";
import BaseComponent from "../BaseComponent";
import { InputErrorInfo } from "../common";
import { isValid } from "../common/utils";
import { Redirect } from "react-router-dom";
import RegisterService from "./Register.service";
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

export default class Register extends BaseComponent {
  constructor() {
    super();
    this.state = {
      redirect: false,
      email: "",
      firstname: "",
      middlename: "",
      lastname: "",
      password: "",
      password2: "",
      errors: {
        email: "",
        firstname: "",
        middlename: "",
        lastname: "",
        password: "",
        password2: ""
      },
      apiError: "",
      showApiError: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (this.validateFields()) {
      //TODO: Call server to register user
      const { email, firstname, middlename, lastname, password } = this.state;
      const userRegInfo = { email, firstname, middlename, lastname, password };
      const response = await new RegisterService().registerUser(userRegInfo);
      if (response.status) {
        this.setState({ redirect: true });
      }
    }
  }

  validateFields(field) {
    const errors = this.state.errors;
    const doAll = !field || field === "*";

    if (doAll || field === "email") {
      errors.email = "";
      if (validator.isEmpty(this.state.email)) errors.email += "Email is required. ";
      else if (!validator.isEmail(this.state.email)) errors.email += "Invalid email address. ";
    }

    if (doAll || field === "firstname") {
      errors.firstname = "";
      if (validator.isEmpty(this.state.firstname)) errors.firstname += "First name is required. ";
    }

    if (doAll || field === "lastname") {
      errors.lastname = "";
      if (validator.isEmpty(this.state.lastname)) errors.lastname += "Surname is required. ";
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
                  <Alert color="danger" isOpen={this.state.showApiError}>
                    {this.state.apiError}
                  </Alert>
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
                        required={true}
                        placeholder="First Name"
                        name="firstname"
                        onChange={this.handleInputChange}
                      />
                      <InputErrorInfo
                        input="firstname"
                        info={this.state.errors.firstname}
                        show={this.state.errors.firstname.length > 0}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="Middle Name"
                        name="middlename"
                        onChange={this.handleInputChange}
                      />
                      <InputErrorInfo
                        input="middlename"
                        info={this.state.errors.middlename}
                        show={this.state.errors.middlename.length > 0}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        required={true}
                        placeholder="Surname"
                        name="lastname"
                        onChange={this.handleInputChange}
                      />
                      <InputErrorInfo
                        input="lastname"
                        info={this.state.errors.lastname}
                        show={this.state.errors.lastname.length > 0}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="email"
                        required={true}
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
                        required={true}
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
                        required={true}
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
                {/* <CardFooter className="p-4">
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
                </CardFooter> */}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
