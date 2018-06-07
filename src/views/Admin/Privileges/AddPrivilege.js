import PrivilegeService from "./Privileges.service";
import React, { Component } from "react";
import validator from "validator";
import { InputErrorInfo } from "../../common";
import { isValid } from "../../common/utils";
import {
  Alert,
  Button,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";

export default class AddPrivilege extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  getInitialState() {
    return { name: "", showApiError: false, apiError: "", errors: { name: "" } };
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const field = target.name;
    this.setState({ [field]: value }, () => {
      this.validateFields(field);
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (this.validateFields()) {
      const result = await new PrivilegeService().add(this.state.name);
      if (result.status) {
        this.setState(this.getInitialState());
        this.props.toggle();
      } else {
        this.setState({ apiError: result.message, showApiError: true });
      }
    }
  }

  validateFields(field) {
    const errors = this.state.errors;
    let doAll = !field || field === "*";

    if (doAll || field === "name") {
      errors.name = "";
      if (validator.isEmpty(this.state.name)) errors.name += "Name is required. ";
    }

    return isValid(this, errors, doAll, field);
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        className={"modal-primary " + this.props.className}
      >
        <ModalHeader toggle={this.props.toggle}>Add Privilege</ModalHeader>

        <Alert color="danger" isOpen={this.state.showApiError}>
          {this.state.apiError}
        </Alert>
        <ModalBody>
          <InputGroup className="mb-3">
            <Input type="text" placeholder="Name" name="name" onChange={this.handleInputChange} />
            <InputErrorInfo
              input="name"
              info={this.state.errors.name}
              show={this.state.errors.name.length > 0}
            />
          </InputGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.handleSubmit}>
            Submit
          </Button>{" "}
          <Button color="secondary" onClick={this.props.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
