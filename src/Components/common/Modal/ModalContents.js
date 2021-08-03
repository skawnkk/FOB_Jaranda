import React from "react";
import styled from "styled-components";
import SignUpModal from "Components/common/Modal/SignupModal";

const ModalContents = (props) => {
  const { modalType } = props;

  const selectModalView = (modalType) => {
    switch (modalType) {
      case "success":
        return (
          <div>
            <span>가입이 완료되었습니다🎉</span>
          </div>
        );
      default:
        return <SignUpModal modalType={modalType} />;
    }
  };

  return <Wrapper>{selectModalView(modalType)}</Wrapper>;
};

const Wrapper = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100%;
  height: 100%;
  ${({ theme }) => theme.flexSet("center", "center", "column")}
  padding: 20px 10px;
  border: 1px solid ${({ theme }) => theme.color.green};

  > div {
    margin-bottom: 30px;
  }

  span {
    font-weight: 700;
    font-size: 1.2rem;
  }
`;

export default ModalContents;
