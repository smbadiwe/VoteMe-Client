import { Component } from "react";

/**
 * This base class has a 'handleInputChange' event to update state and validate entry.
 * To override, write your own 'handleInputChange(event)' method.
 * If you have custom validation logic, put it in a class method called 'validateFields(field)'.
 */
export default class BaseComponent extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value =
      target.type === "checkbox" || target.type === "radio" ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value }, () => {
      this.validateFields(name);
    });
  }

  validateFields(name) {
    // console.log(
    //   "Consider providing a validateFields(field) function in your class to handle input field validations."
    // );
    return true;
  }

  // shouldComponentUpdate(nextProps, nextState) {

  //   return super.shouldComponentUpdate(nextProps, nextState);
  // }
}
