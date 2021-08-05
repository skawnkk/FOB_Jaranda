import React from "react";
import styled from "styled-components";
import ModalPortal from "./ModalPortal";
import ModalContents from "./ModalContents";

const Modal = (props) => {
  const { isOpen, toggleModal, modalType, setIsCreateAccount } = props;

  return (
    <>
      {isOpen ? (
        <ModalPortal>
          <Wrapper>
            <ModalContents
              setIsCreateAccount={setIsCreateAccount}
              modalType={modalType}
              toggleModal={toggleModal}
            />
          </Wrapper>
        </ModalPortal>
      ) : null}
    </>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 300px;
  transform: translate(-50%, -50%);
  box-shadow: rgba(0, 0, 0, 0.08) 0 4px 2px -2px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.background};
`;

export default Modal;
