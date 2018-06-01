import React from "react";
import BaseComponent from "../BaseComponent";
import ResetPasswordService from "./ResetPassword.service";
import {
  Alert,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";

class ResetPassword extends BaseComponent {
  constructor() {
    super();
    this.state = {
      email: "",
      feedback: "",
      failure: false,
      alertVisible: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();

    const result = await new ResetPasswordService().sendResetPasswordMailTo(this.state.email);
    this.setState({ feedback: result.message, alertVisible: true, failure: result.status });
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h1>Reset Password</h1>
                  <p className="text-muted">
                    We'll send you an email to help you reset your password
                  </p>
                  <Alert
                    color={this.state.failure ? "danger" : "success"}
                    isOpen={this.state.alertVisible}
                  >
                    {this.state.message}
                  </Alert>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>@</InputGroupText>
                    </InputGroupAddon>
                    <Input type="email" placeholder="Email" name="email" />
                  </InputGroup>
                  <Button color="success" onClick={this.handleSubmit} block>
                    Submit
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ResetPassword;
