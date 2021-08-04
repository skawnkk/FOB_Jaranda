import React, { useState, useEffect } from "react";
//TODO: 상수 관리
import { PAGE_SIZE } from "Pages/Admin";

const Pagination = ({ pageNum, setPageNum, wholePages }) => {
  const totalPages = Array.from({ length: wholePages }, (_, idx) => idx + 1);

  const handlePage = (e, page) => {
    const type = e.target.id;

    if (type === "prev") setPageNum((prevPage) => prevPage - 1);
    if (type === "next") setPageNum((prevPage) => prevPage + 1);
    if (type === "first") setPageNum(0);
    if (type === "last") setPageNum(wholePages.length - 1);
    if (type === "pagination") setPageNum(page);
  };

  return (
    //TODO: 처음, prev, next, end disable추가하기
    <div>
      <button id="first" type="button" onClick={handlePage} disabled={pageNum == 0 ? true : false}>
        {`<<`}처음
      </button>
      <button id="prev" type="button" onClick={handlePage} disabled={pageNum == 0 ? true : false}>
        {`<`}PREV
      </button>
      {totalPages.map((page, idx) => (
        <button key={idx} id="pagination" onClick={(e) => handlePage(e, idx)}>
          {page}
        </button>
      ))}
      <button id="next" type="button" onClick={handlePage}>
        NEXT {`>`}
      </button>
      <button id="last" type="button" onClick={handlePage}>
        END {`>>`}
      </button>
    </div>
  );
};

export default Pagination;
