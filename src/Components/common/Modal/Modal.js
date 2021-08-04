import React from "react";
import ModalPortal from "./ModalPortal";
import ModalContents from "./ModalContents";

const Modal = ({ isOpen, modalType, toggleModal, onSelected }) => {
  return (
    <div id="modalDom">
      {isOpen && (
        <ModalPortal toggleModal={toggleModal}>
          <ModalContents modalType={modalType} toggleModal={toggleModal} onSelected={onSelected} />
        </ModalPortal>
      )}
    </div>
  );
};

export default Modal;
