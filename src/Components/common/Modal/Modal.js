import React, { useState } from "react";
import styled from "styled-components";
import ModalPortal from "./ModalPortal";
import ModalTypeView from "./ModalTypeView";
import Button from "../Button";

const Modal = (props) => {
  const {
    isOpen,
    toggleModal,
    modalType,
    title,
    content,
    closeButton = "false",
    submitButton = "false",
  } = props;

  const setTitleContent = () => {
    return (
      <ContentContainer>
        <Title>{title}</Title>
        <Content>{content}</Content>
      </ContentContainer>
    );
  };

  const setButton = () => {
    //true,false값 수정필요
    if (submitButton === "true") {
      return <Button type="submit" width="30%" value="등록" onClick={toggleModal}></Button>;
    }
    if (closeButton === "true") {
      return <Button width="30%" value="닫기" onClick={toggleModal}></Button>;
    }
  };

  return (
    <>
      {isOpen ? (
        <ModalPortal>
          <Wrapper>
            {setTitleContent()}
            <ModalTypeView modalType={modalType} />
            {setButton()}
          </Wrapper>
        </ModalPortal>
      ) : null}
    </>
  );
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
`;

const ContentContainer = styled.div`
  ${({ theme }) => theme.flexSet("center", "center", "column")}
  margin-bottom: 20px;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 20px;
`;
const Content = styled.div`
  font-size: 1rem;
  padding: 10px;
  width: 80%;
`;

export default Modal;
