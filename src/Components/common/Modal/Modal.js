import React from "react";
import ModalPortal from "./ModalPortal";

const Modal = ({ isOpen, toggleModal, children }) => {
  return (
    <div id="modalDom">
      {isOpen && <ModalPortal toggleModal={toggleModal}> {children}</ModalPortal>}
    </div>
  );
};

export default Modal;
