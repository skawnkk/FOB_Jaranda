import React, { useState, useEffect } from "react";
import styled from "styled-components";
//TODO: 상수 관리
import { PAGE_SIZE } from "Pages/Admin";

const Pagination = ({ pageNum, setPageNum, wholePages }) => {
  const totalPages = Array.from({ length: wholePages }, (_, idx) => idx + 1);
  const handlePage = (e, page) => {
    const type = e.target.id;
    if (type === "prev") setPageNum((prevPage) => prevPage - 1);
    if (type === "next") setPageNum((prevPage) => prevPage + 1);
    if (type === "first") setPageNum(0);
    if (type === "last") setPageNum(wholePages - 1);
    if (type === "pagination") setPageNum(page);
  };

  return (
    <PaginationWrapper>
      <PaginationBtn id="first" onClick={handlePage} pageNum={pageNum} disabled={!pageNum}>
        {`<<`}처음
      </PaginationBtn>
      <PaginationBtn id="prev" onClick={handlePage} pageNum={pageNum} disabled={!pageNum}>
        {`<`}PREV
      </PaginationBtn>
      {totalPages.map((page, idx) => (
        <PaginationBtn
          key={idx}
          id="pagination"
          page={idx}
          pageNum={pageNum}
          onClick={(e) => handlePage(e, idx)}>
          {page}
        </PaginationBtn>
      ))}
      <PaginationBtn
        id="next"
        onClick={handlePage}
        pageNum={pageNum}
        disabled={pageNum === wholePages - 1}>
        NEXT {`>`}
      </PaginationBtn>
      <PaginationBtn
        id="last"
        onClick={handlePage}
        pageNum={pageNum}
        disabled={pageNum === wholePages - 1}>
        END {`>>`}
      </PaginationBtn>
    </PaginationWrapper>
  );
};

export default Pagination;

const PaginationWrapper = styled.div`
  ${({ theme }) => theme.flexSet()};
`;

const PaginationBtn = styled.button`
  border: 0.5px solid ${({ theme }) => theme.color.borderline};
  border-radius: 3px;
  margin-right: 5px;
  background-color: ${({ theme, page = -1, pageNum }) =>
    page === pageNum ? theme.color.button : theme.color.fontWhite};
`;
