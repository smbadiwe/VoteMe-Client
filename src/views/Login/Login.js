import React from "react";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import BaseComponent from "../BaseComponent";
import { AppSwitch } from "@coreui/react";
import LoginService from "./Login.service";

class Login extends BaseComponent {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      rememberme: false,
      redirect: false,
      errormessage: "",
      alertVisible: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();

    const result = await new LoginService().authenticateUser(
      this.state.username,
      this.state.password,
      this.state.rememberme
    );

    if (result.status) {
      this.setState({ redirect: true });
    } else {
      this.setState({ errormessage: result.message, alertVisible: true });
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/dashboard" />;
    }
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>Login</h1>

                    <Alert color="danger" isOpen={this.state.alertVisible}>
                      {this.state.errormessage}
                    </Alert>
                    <p className="text-muted">Sign In to your account</p>
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
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={this.handleInputChange}
                      />
                    </InputGroup>
                    <label>
                      <AppSwitch
                        className={"mx-1"}
                        variant={"3d"}
                        outline={"alt"}
                        color={"primary"}
                        label
                        dataOn={"\u2713"}
                        dataOff={"\u2715"}
                        name="rememberme"
                        onChange={this.handleInputChange}
                      />
                      Remember me
                    </label>
                    <Row>
                      <Col xs="6">
                        <Button color="primary" className="px-4" onClick={this.handleSubmit}>
                          Login
                        </Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Link
                          to={"/resetpassword"}
                          color="primary"
                          className="px-0"
                          active="active"
                        >
                          Forgot password?
                        </Link>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <Card
                  className="text-white bg-primary py-5 d-md-down-none"
                  style={{ width: 44 + "%" }}
                >
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                      </p>
                      <Link to={"/register"} color="primary" className="mt-3" active="active">
                        Register Now!
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
