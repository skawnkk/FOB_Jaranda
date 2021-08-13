import React from "react";
import Input from "Components/common/Input";
import Modal from "Components/common/Modal/Modal";
import CreditModal from "Components/common/Modal/CreditModal";
import { Card } from "Assets/svg";
import styled from "styled-components";

export const CreditForm = ({ value, error, toggleModal, isOpen, modalType, handleSetFormData }) => {
  return (
    <>
      <CreditCardWrapper onClick={() => toggleModal("credit")}>
        <Input
          name="creditCardNum"
          value={value}
          placeholder="신용카드 정보를 입력하세요"
          icon={<Card />}
          error={error}
          errorMessage="카드번호를 다시 입력해 주세요"
        />
        <span>번호입력</span>
      </CreditCardWrapper>

      <Modal {...{ isOpen, toggleModal, modalType }}>
        {modalType === "credit" && (
          <CreditModal
            creditCard={value}
            handleSetCardNum={handleSetFormData}
            toggleModal={toggleModal}
          />
        )}
      </Modal>
    </>
  );
};

const CreditCardWrapper = styled.div`
  position: relative;
  background-color: white;
  span {
    position: absolute;
    top: 12.5px;
    right: 2px;
    color: ${({ theme }) => theme.color.green};
    font-size: 13px;
    font-weight: 600;
    padding: 10px 50px 13px 0;
    cursor: pointer;
  }
  svg {
    z-index: 1;
  }
`;
