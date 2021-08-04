import React from "react";
import ModalPortal from "./ModalPortal";
import ModalTypeView from "./ModalTypeView";
import ModalContents from "./ModalContents";
import Button from "../Button";
import styled from "styled-components";

const Modal = (props) => {
  const {
    isOpen,
    toggleModal,
    modalType,
    title,
    content,
    closeButton = "false",
    submitButton = "false",
    onSelected,
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
    <div id="modalDom">
      {isOpen && (
        <ModalPortal toggleModal={toggleModal}>
          {setTitleContent()}
          <ModalContents modalType={modalType} toggleModal={toggleModal} onSelected={onSelected} />
          {setButton()}
        </ModalPortal>
      )}
    </div>
  );
};

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
