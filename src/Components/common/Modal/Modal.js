import React from "react";
import ModalPortal from "Components/common/Modal/ModalPortal";

const Modal = ({ isOpen, toggleModal, modalType = null, children }) => {
  return (
    <div id="modalDom">
      {isOpen && (
        <ModalPortal toggleModal={toggleModal} modalType={modalType}>
          {children}
        </ModalPortal>
      )}
    </div>
  );
};

export default Modal;
