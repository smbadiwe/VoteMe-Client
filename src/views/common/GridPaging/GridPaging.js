import { PaginationLink, PaginationItem, Pagination } from "reactstrap";
import React from "react";

function GridPaging(props) {
  return (
    <Pagination>
      <PaginationItem>
        <PaginationLink tag="button" key="0" onClick={() => props.onPageNavClick(0)}>
          First
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          previous
          tag="button"
          onClick={() => props.onPageNavClick(prevPageIndex(props))}
        >
          Prev
        </PaginationLink>
      </PaginationItem>
      <PaginationItem active>
        <PaginationLink disabled={true} tag="button">
          {currentPage(props)}
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          next
          tag="button"
          onClick={() => props.onPageNavClick(nextPageIndex(props))}
        >
          Next
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink tag="button" onClick={() => props.onPageNavClick(lastPageIndex(props))}>
          Last
        </PaginationLink>
      </PaginationItem>
    </Pagination>
  );
}

// this.currentPage  is the page number displayed. It's 1-based.
function currentPage(props) {
  return +props.pageIndex + 1;
}

// This is 0-based
function prevPageIndex(props) {
  return Math.max(currentPage(props) - 2, 0);
}

// This is 0-based
function nextPageIndex(props) {
  return Math.min(currentPage(props), getNumberOfPages(props) - 1);
}

// This is 0-based
function lastPageIndex(props) {
  return getNumberOfPages(props) - 1;
}

function getNumberOfPages(props) {
  if (props.pageSize < 1 || props.totalCount < 1) return 1;

  return Math.ceil(props.totalCount / props.pageSize);
}

export default GridPaging;
