import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Pagination = ({ pageNum, setPageNum, wholePages }) => {
  // const viewPageCount = wholePages / 10; 0이면 1~10인데, wholePage === 전체 페이지 갯수.
  // const totalPages = Array(wholePages % 10).fill(0).map((_, idx) => pageNum + idx))
  //현재페이지 pageNum 10, => 페이지사이즈 10 next클릭시 => 11, 20일때 next클릭시 21
  // pageNum % 10 === 0 일때, totalPages [11,12,13,,,,,20]
  // pageNum % PAGE_SIZE === 0 일때, [10에서 11을 눌렀을 때]=>
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
        {`<< `}First
      </PaginationBtn>
      <PaginationBtn id="prev" onClick={handlePage} pageNum={pageNum} disabled={!pageNum}>
        {`< `}Prev
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
        Next {` >`}
      </PaginationBtn>
      <PaginationBtn
        id="last"
        onClick={handlePage}
        pageNum={pageNum}
        disabled={pageNum === wholePages - 1}>
        End {` >>`}
      </PaginationBtn>
    </PaginationWrapper>
  );
};

export default React.memo(Pagination);

const PaginationWrapper = styled.div`
  ${({ theme }) => theme.flexSet()};
  margin-top: 15px;
`;

const PaginationBtn = styled.button`
  border: 0.5px solid ${({ theme }) => theme.color.borderline};
  border-radius: 3px;
  margin-right: 5px;
  background-color: ${({ theme, page = -1, pageNum }) =>
    page === pageNum ? theme.color.button : theme.color.fontWhite};
`;
