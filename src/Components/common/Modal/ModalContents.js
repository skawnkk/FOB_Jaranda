import React from "react";
import styled from "styled-components";
const ModalContents = (props) => {
  const { modalType } = props;

  return (
    <Wrapper>
      {modalType === "success" && (
        <div>
          <span>회원가입을 축하합니다🎉</span>
        </div>
      )}
      {modalType === "credit" && (
        <>
          <div>
            <span>신용카드 번호를 입력하세요</span>
          </div>
          <div></div>
        </>
      )}
      {modalType === "address" && (
        <>
          <div>
            <span>동/읍/면을 입력하세요</span>
          </div>
          <div></div>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px 10px;

  border: 1px solid ${({ theme }) => theme.color.green};
  ${({ theme }) => theme.flexSet("center", "center", "column")}

  >div {
    margin-bottom: 30px;
  }
  span {
    font-weight: 700;
    font-size: 1.2rem;
  }
`;

export default ModalContents;
