import React from "react";
import SignupModal from "../../SignupModal";
import AddressModal from "../../AddressModal";
import CreditModal from "../../CreditModal";

const ModalContents = ({ modalType, toggleModal, onSelected }) => {
  const selectModalView = (type) => {
    switch (type) {
      case "success":
        return <SignupModal />;
      case "address":
        return <AddressModal toggleModal={toggleModal} onSelected={onSelected} />;
      case "credit":
        return <CreditModal onSelected={onSelected} />;
      default:
        return null;
    }
  };

  return <>{selectModalView(modalType)}</>;
};

export default ModalContents;
