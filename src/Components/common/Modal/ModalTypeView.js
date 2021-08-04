import AddressModal from "Components/AddressModal";
import CreditModal from "Components/CreditModal";
import React from "react";

const ModalTypeView = (props) => {
  const { modalType } = props;

  const selectedTypeView = () => {
    return (
      <>
        {modalType === "credit" && <CreditModal />}
        {modalType === "address" && <AddressModal />}
      </>
    );
  };

  return <>{selectedTypeView()}</>;
};

export default ModalTypeView;
