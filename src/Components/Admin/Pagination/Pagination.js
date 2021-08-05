import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Pagination = ({ pageNum, setPageNum, wholePages }) => {
  // const viewPageCount = wholePages / 10; 0이면 1~10인데, wholePage === 전체 페이지 갯수.
  // const totalPages = Array(wholePages % 10).fill(0).map((_, idx) => pageNum + idx))
  //현재페이지 pageNum 10, => 페이지사이즈 10 next클릭시 => 11, 20일때 next클릭시 21
  // pageNum % 10 === 0 일때, totalPages [11,12,13,,,,,20]
  /*
  // display: ${({ page }) => (parseInt(page / 10) > Math.ceil(page / 1) ? "none" : "inline-block")};
  ! offset = 페이지 시작점 offset = Math.ceil(pageNum / PAGE_SIZE)
  ! 시작점 계산식 = (offset - 1) * PAGE_SIZE + 1
  ! PAGE_SIZE만큼 버튼 출력 조건식 = wholePages - 시작점 >= PAGE_SIZE ? 10개 : wholePages - 시작점 + 1 갯수만큼 버튼 출력
  */
  // pageNum % PAGE_SIZE === 0 일때, [10에서 11을 눌렀을 때]=>
  const totalPages = Array.from({ length: wholePages }, (_, idx) => idx + 1);
  // [1,2,3,4,5,6,7,8,9,10,........36] => 전체 페이지를 갖는 배열
  //totalPages가 바뀐당 => [1,2,3,4,5,6,7,8,9,10] => 7선택 시 [2,3,4,5,6,7,8,9,10,11]로.=>배열만 만드는거 생각해보면 구현 가능스?
  //pageNum 왼쪽[최대 5개], 오른쪽[10 -왼쪽갯수]개 붙여서 배열생성 => ex) pageNum === 3 -> [1,2,"3"] + [4,5,6,7,8,9,10]
  // pageNum === 7 :: [2,3,4,5,6] + ["7",8,9,10,11] => left = slice[seleted - 5, selected] , + right = slice[seleted, selected + 5]
  //pageNum === 1 :: ["1",2,3,4,5] [6,7,8,9,10] => left = slice(0, 6) + right = slice(6, 10)
  ////selected - 5 < 0 ? 0 : selected - 5 :: 1일때 0, 2일때 0, ...5일때 0, 6일때 1 7일때 2부터 시작 :: 왼쪽배열 생성
  //right:: slice(pageNum, pageNum + 5) :: 우측배열생성 -> (right + left).map(value => <Page page={idx}>{value})
  // ! pageNum = 0부터 시작
  const changeBook = (totalPages) => {
    let returnVal;
    if (pageNum < 8) returnVal = totalPages.slice(0, 10);
    // 구글에서 7클릭됐을때 옆에 11이 추가되고 왼쪽에 1이빠지더라고요
    //pageNum이 0부터 시작해서 pageNum < 8로 해야하지 않을까용?!?
    // 페이지 이동이 index로 넘어가서 value로 바꾸면 될것같은,, [7,8,9,10,11,12]인데 7클릭하면 0들어갈거같아요 페이지사이즈어딧젼 감사합니당
    // 이제 클릭햇을때 이동은 잘 되는데 한페이지 밀려서 되는 거랑 첫 페이지 때 버튼갯수 덜보여주는거 ? 고치면 ?~?~!?~!
    else returnVal = totalPages.slice(pageNum - 5, pageNum + 5);
    return returnVal;
  };

  const [lastBook, setLastBook] = useState([]);
  useEffect(() => {
    console.log(pageNum);
    setLastBook(changeBook(totalPages));
    console.log(lastBook);
  }, [pageNum, lastBook.length, wholePages]);

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
      <PaginationBtn id="first" onClick={handlePage} pageNum={pageNum} disabled={!pageNum}>
        {`<< `}First
      </PaginationBtn>
      <PaginationBtn id="prev" onClick={handlePage} pageNum={pageNum} disabled={!pageNum}>
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
      <PaginationBtn
        id="next"
        onClick={handlePage}
        pageNum={pageNum}
        disabled={pageNum === wholePages - 1}>
        Next {` >`}
      </PaginationBtn>
      <PaginationBtn
        id="end"
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
