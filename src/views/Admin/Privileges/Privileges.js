import PrivilegeService from "./Privileges.service";
import AddPrivilege from "./AddPrivilege";
import EditPrivilege from "./EditPrivilege";
import React from "react";
import BaseComponent from "../../BaseComponent";
import validator from "validator";
import { isValid } from "../../common/utils";
import { GridPaging } from "../../common";
import queryString from "query-string";
import { Redirect } from "react-router-dom";

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
    const parsed = queryString.parse(this.props.location.search);
    this.state = {
      // grid: search and result
      searchParams: {
        pageIndex: parsed.pageIndex || 0,
        pageSize: parsed.pageSize || 10
      },
      dataResult: { data: [], totalCount: 0 },
      apiError: "",
      showApiError: false,

      // edit
      editRecordId: 0,
      editRecord: {},
      editModal: false,

      // add
      modal: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleInputChangeForEditModal = this.handleInputChangeForEditModal.bind(this);
    this.onPageNavClick = this.onPageNavClick.bind(this);
  }

  onPageNavClick(pageIndex) {
    const searchParams = this.state.searchParams;
    searchParams.pageIndex = pageIndex;
    this.setState({ searchParams: searchParams }, () => {
      this.fetchGridData();
    });
  }

  componentDidMount() {
    this.fetchGridData();
  }

  render() {
    const rows = this.state.dataResult.data.map((item, index) => {
      return (
        <tr key={index}>
          <td>
            {index + 1 + this.state.searchParams.pageIndex * this.state.searchParams.pageSize}
          </td>
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
                  toggle={() => this.toggleEdit(this.state.editRecordId)}
                  editRecord={this.state.editRecord}
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
                <GridPaging
                  onPageNavClick={this.onPageNavClick}
                  totalCount={this.state.dataResult.totalCount}
                  pageIndex={this.state.searchParams.pageIndex}
                  pageSize={this.state.searchParams.pageSize}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }

  fetchGridData() {
    new PrivilegeService()
      .search(this.state.searchParams.pageIndex, this.state.searchParams.pageSize)
      .then(res => {
        this.setState({ dataResult: res });
      });
  }

  handleInputChangeForEditModal(field, value) {
    const editRecord = this.state.editRecord;
    editRecord[field] = value;
    this.setState({ editRecord: editRecord });
    this.validateFieldsForEditModal(field);
  }

  validateFieldsForEditModal(field) {
    const errors = this.state.editRecord.errors;
    let doAll = !field || field === "*";

    if (doAll || field === "name") {
      const name = this.state.editRecord.name;
      errors.name = "";
      if (validator.isEmpty(name)) errors.name += "Name is required. ";
    }
    return isValid(this, errors, doAll, field);
  }

  async handleSubmitForEditModal() {
    const isValid = this.validateFieldsForEditModal();
    if (isValid) {
      const result = await new PrivilegeService().add(this.state.editRecord.name);
      const editRecord = this.state.editRecord;
      if (result.status) {
        editRecord.apiError = "";
        editRecord.showApiError = false;
        this.setState(prevState => ({
          editModal: !prevState.editModal
        }));
      } else {
        editRecord.apiError = result.message;
        editRecord.showApiError = true;
      }
      this.setState({ editRecord: editRecord });
    }
  }

  toggleEdit(editRecordId) {
    if (editRecordId <= 0 || this.state.editRecordId === editRecordId) {
      this.setState(prevState => ({
        editModal: !prevState.editModal
      }));
    } else {
      new PrivilegeService()
        .getById(editRecordId)
        .then(res => {
          if (res.status) {
            const editRecordToEdit = res.data;
            editRecordToEdit.errors = { name: "" };
            editRecordToEdit.showApiError = false;
            editRecordToEdit.apiError = "";
            this.setState(prevState => ({
              editModal: !prevState.editModal,
              editRecordId: editRecordId,
              editRecord: editRecordToEdit
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
}
