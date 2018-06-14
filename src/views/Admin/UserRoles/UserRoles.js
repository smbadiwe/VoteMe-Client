import React from "react";
import UserRolesService from "./UserRoles.service";
import BaseComponent from "../../BaseComponent";
import { GridPaging } from "../../common";
import { Link, Redirect } from "react-router-dom";
import { queryString } from "../../index";
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

export default class UserRoles extends BaseComponent {
  constructor(props) {
    super(props);
    const parsed = queryString.parse(this.props.location.search);
    this.state = {
      // grid: search and result
      searchParams: { pageIndex: parsed.pageIndex || 0, pageSize: parsed.pageSize || 10 },
      dataResult: { data: [], totalCount: 0 },
      apiError: "",
      showApiError: false,
      editRecordId: 0,
      redirectToEdit: false
    };

    this.launchEdit = this.launchEdit.bind(this);
  }

  launchEdit(recordId) {
    this.setState({ redirectToEdit: true, editRecordId: recordId });
  }

  render() {
    if (this.state.redirectToEdit) {
      return <Redirect to={`/admin/userroles/addedit/${this.state.editRecordId}`} />;
    }
    const rows = this.state.dataResult.data.map((item, index) => (
      <Rows
        index={index}
        item={item}
        onRowClick={this.launchEdit}
        pageIndex={this.state.searchParams.pageIndex}
        pageSize={this.state.searchParams.pageSize}
      />
    ));
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" /> User Roles
                <Link
                  to={`/admin/users/addedit`}
                  color="primary"
                  className="btn btn-sm btn-primary mr-1 float-right"
                >
                  Add User Role
                </Link>
              </CardHeader>
              <CardBody>
                <Alert color="danger" isOpen={this.state.showApiError}>
                  {this.state.apiError}
                </Alert>
                <Table responsive striped size="sm">
                  <thead>
                    <tr>
                      <th>#</th>
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
    new UserRolesService()
      .search(this.state.searchParams.pageIndex, this.state.searchParams.pageSize)
      .then(res => {
        if (res.status) {
          this.setState({ dataResult: res.data });
        } else {
          this.setState({
            apiError: res.message,
            showApiError: true,
            dataResult: { data: [], totalCount: 0 }
          });
        }
      })
      .catch(err => {
        this.setState({
          apiError: err.message,
          showApiError: true,
          dataResult: { data: [], totalCount: 0 }
        });
      });
  }

  componentDidMount() {
    this.fetchGridData();
  }
}

class Rows extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  render() {
    const item = this.props.item;
    const index = this.props.index;
    return (
      <tr key={index} onClick={this.handleClick}>
        <td>{index + 1 + this.props.pageIndex * this.props.pageSize}</td>
        <td>{item.id}</td>
        <td>{item.name}</td>
      </tr>
    );
  }

  handleClick() {
    this.props.onRowClick(this.props.item.id);
  }
}
