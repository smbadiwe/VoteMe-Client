import PrivilegeService from "./Privileges.service";
import AddPrivilege from "./AddPrivilege";
import EditPrivilege from "./EditPrivilege";
import React from "react";
import BaseComponent from "../../BaseComponent";
import validator from "validator";
import { isValid } from "../../common/utils";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Table,
  Row
} from "reactstrap";

export default class Privileges extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      pageSize: 10,
      recordId: 0,
      record: {},
      showApiError: false,
      apiError: "",
      modal: false,
      editModal: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleInputChangeForEditModal = this.handleInputChangeForEditModal.bind(this);
  }

  handleInputChangeForEditModal(field, value) {
    const record = this.state.record;
    record[field] = value;
    this.setState({ record: record });
    this.validateFieldsForEditModal(field);
  }

  validateFieldsForEditModal(field) {
    const errors = this.state.record.errors;
    let doAll = !field || field === "*";

    if (doAll || field === "name") {
      const name = this.state.record.name;
      errors.name = "";
      if (validator.isEmpty(name)) errors.name += "Name is required. ";
    }
    return isValid(this, errors, doAll, field);
  }

  async handleSubmitForEditModal() {
    const isValid = this.validateFieldsForEditModal();
    if (isValid) {
      const result = await new PrivilegeService().add(this.state.record.name);
      const record = this.state.record;
      if (result.status) {
        record.apiError = "";
        record.showApiError = false;
        this.setState(prevState => ({
          editModal: !prevState.editModal
        }));
      } else {
        record.apiError = result.message;
        record.showApiError = true;
      }
      this.setState({ record: record });
    }
  }

  toggleEdit(recordId) {
    if (recordId <= 0 || this.state.recordId === recordId) {
      this.setState(prevState => ({
        editModal: !prevState.editModal
      }));
    } else {
      new PrivilegeService()
        .getById(recordId)
        .then(res => {
          if (res.status) {
            const recordToEdit = res.data;
            recordToEdit.errors = { name: "" };
            recordToEdit.showApiError = false;
            recordToEdit.apiError = "";
            this.setState(prevState => ({
              editModal: !prevState.editModal,
              recordId: recordId,
              record: recordToEdit
            }));
          } else {
            this.setState({
              apiError: res.message,
              showApiError: true
            });
          }
        })
        .catch(err => {
          this.setState({
            apiError: err.message,
            showApiError: true
          });
        });
    }
  }

  toggle() {
    this.setState({ modal: !this.state.modal });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ redirect: true });
  }

  getData() {
    return [
      { id: 121, name: "Soma" },
      { id: 122, name: "Soma2" },
      { id: 123, name: "Soma3" },
      { id: 124, name: "Soma4" },
      { id: 125, name: "Soma5" },
      { id: 122, name: "Soma2" },
      { id: 123, name: "Soma3" },
      { id: 124, name: "Soma4" },
      { id: 125, name: "Soma5" },
      { id: 125, name: "Soma5" }
    ];
  }
  render() {
    const data = this.getData();
    const rows = data.map((item, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.id}</td>
          <td>
            <a href="javascript:void();" onClick={() => this.toggleEdit(item.id)}>
              {item.name}
            </a>
          </td>
        </tr>
      );
    });
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" /> Privileges
                <Button color="primary" onClick={this.toggle} className="mr-1 float-right">
                  Add Privilege
                </Button>
              </CardHeader>
              <CardBody>
                <Alert color="danger" isOpen={this.state.showApiError}>
                  {this.state.apiError}
                </Alert>
                <AddPrivilege isOpen={this.state.modal} toggle={this.toggle} />
                <EditPrivilege
                  isOpen={this.state.editModal}
                  toggle={() => this.toggleEdit(this.state.recordId)}
                  record={this.state.record}
                  onSubmit={async () => await this.handleSubmitForEditModal()}
                  onInputChange={this.handleInputChangeForEditModal}
                />
                <Table responsive striped size="sm">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Id</th>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>{rows}</tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
