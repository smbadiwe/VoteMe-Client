import PrivilegeService from "./Privileges.service";
import React, { Component } from "react";
import { isObjectEmpty } from "../../common/utils";
import { InputErrorInfo } from "../../common";
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

export default class EditPrivilege extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const field = target.name;

    this.props.onInputChange(field, value);
  }

  async handleSubmit(event) {
    event.preventDefault();
    await this.props.onSubmit();
  }

  render() {
    if (isObjectEmpty(this.props.record)) {
      return null;
    }

    const nameErrorMsg = this.props.record.errors.name;
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        className={"modal-primary " + this.props.className}
      >
        <ModalHeader toggle={this.props.toggle}>Edit Privilege</ModalHeader>

        <Alert color="danger" isOpen={this.props.record.showApiError}>
          {this.props.record.apiError}
        </Alert>
        <ModalBody>
          <InputGroup className="mb-3">
            <Input
              type="text"
              placeholder="Name"
              name="name"
              value={this.props.record.name}
              onChange={this.handleInputChange}
            />
            <InputErrorInfo
              input="name"
              info={nameErrorMsg}
              show={nameErrorMsg && nameErrorMsg.length > 0}
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
