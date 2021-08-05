import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Pagination = ({ pageNum, setPageNum, wholePages }) => {
  const [lastBook, setLastBook] = useState([]);
  const totalPages = Array.from({ length: wholePages }, (_, idx) => idx + 1);
  const changeBook = (totalPages) =>
    pageNum < 8 ? totalPages.slice(0, 10) : totalPages.slice(pageNum - 5, pageNum + 5);

  useEffect(() => {
    setLastBook(changeBook(totalPages));
  }, [pageNum, wholePages]);

  const handlePage = (e, page) => {
    const type = e.target.id;
    if (type === "prev") setPageNum((prevPage) => prevPage - 1);
    if (type === "next") setPageNum((prevPage) => prevPage + 1);
    if (type === "first") setPageNum(0);
    if (type === "end") setPageNum(wholePages - 1);
    if (type === "pagination") setPageNum(page - 1);
  };

  return (
    <PaginationWrapper>
      <PaginationBtn id="first" onClick={handlePage} disabled={!pageNum}>
        {`<< `}First
      </PaginationBtn>
      <PaginationBtn id="prev" onClick={handlePage} disabled={!pageNum}>
        {`< `}Prev
      </PaginationBtn>
      {lastBook.map((page, idx) => (
        <PaginationBtn
          key={idx}
          id="pagination"
          page={page}
          pageNum={pageNum + 1}
          onClick={(e) => handlePage(e, page)}>
          {page}
        </PaginationBtn>
      ))}
      <PaginationBtn id="next" onClick={handlePage} disabled={pageNum === wholePages - 1}>
        Next {` >`}
      </PaginationBtn>
      <PaginationBtn id="end" onClick={handlePage} disabled={pageNum === wholePages - 1}>
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
  background-color: ${({ theme, page = 0, pageNum = -1 }) =>
    page === pageNum ? theme.color.button : theme.color.fontWhite};
`;
