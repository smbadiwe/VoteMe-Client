import React from "react";
import ReactDOM from "react-dom";
import UserRoles from "./UserRoles";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<UserRoles />, div);
  ReactDOM.unmountComponentAtNode(div);
});
