import { PaginationLink, PaginationItem, Pagination } from "reactstrap";
import React, { Component } from "react";

export default class GridPaging extends Component {
  // this.currentPage  is the page number displayed. It's 1-based.
  currentPage() {
    return +this.props.pageIndex + 1;
  }

  // This is 0-based
  prevPageIndex() {
    return Math.max(this.currentPage() - 2, 0);
  }

  // This is 0-based
  nextPageIndex() {
    return Math.min(this.currentPage(), this.getNumberOfPages() - 1);
  }

  // This is 0-based
  lastPageIndex() {
    return this.getNumberOfPages() - 1;
  }

  getNumberOfPages() {
    if (this.props.pageSize < 1 || this.props.totalCount < 1) return 1;

    return Math.ceil(this.props.totalCount / this.props.pageSize);
  }

  render() {
    return (
      <Pagination>
        <PaginationItem>
          <PaginationLink tag="button" key="0" onClick={() => this.props.onPageNavClick(0)}>
            First
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            previous
            tag="button"
            onClick={() => this.props.onPageNavClick(this.prevPageIndex())}
          >
            Prev
          </PaginationLink>
        </PaginationItem>
        <PaginationItem active>
          <PaginationLink disabled={true} tag="button">
            {this.currentPage()}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            next
            tag="button"
            onClick={() => this.props.onPageNavClick(this.nextPageIndex())}
          >
            Next
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            tag="button"
            onClick={() => this.props.onPageNavClick(this.lastPageIndex())}
          >
            Last
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    );
  }
}
