import React from "react";
import ReactDOM from "react-dom";
import GridPaging from "./GridPaging";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<GridPaging pageIndex="0" totalCount="25" pageSize="10" />, div);
  ReactDOM.unmountComponentAtNode(div);
});
