import React from "react";
import BaseComponent from "../BaseComponent";
import { Redirect } from "react-router-dom";
import {
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
  constructor() {
    super();
    this.state = {
      password: "",
      password2: "",
      email: this.props.match.params.email
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ redirect: true });
  }

  handleCancel(event) {
    event.preventDefault();
    this.setState({ cancel: true });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }
    if (this.state.cancel) {
      return <Redirect to="/" />;
    }
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h1>Change Password</h1>
                  <p className="text-muted">Change your password</p>
                  {/* <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-user" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" placeholder="Username" />
                  </InputGroup> */}
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>@</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="email"
                      disabled={this.state.email ? true : false}
                      placeholder="Email"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleInputChange}
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
                      placeholder="Repeat password"
                      name="password2"
                      onChange={this.handleInputChange}
                    />
                  </InputGroup>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button color="success" block onClick={this.handleSubmit}>
                        <span>Change Password</span>
                      </Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button color="default" block onClick={this.handleCancel}>
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
