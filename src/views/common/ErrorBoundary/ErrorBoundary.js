import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    // You can also log error messages to an error reporting service here
    // Stack trace in {this.state.errorInfo.componentStack}
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="6">
                <div className="clearfix">
                  <h1 className="float-left display-3 mr-4">400</h1>
                  <h4 className="pt-3">Oops! Something about your request is not right.</h4>
                  <p className="text-muted float-left">
                    {this.state.error && this.state.error.toString()}
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
