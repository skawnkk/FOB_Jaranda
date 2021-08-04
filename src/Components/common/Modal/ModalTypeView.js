import React from "react";
import styled from "styled-components";
import ModalCredit from "Components/common/Modal/ModalCredit";
import ModalAddress from "Components/common/Modal/ModalAddress";

const ModalTypeView = (props) => {
  const { modalType } = props;

  const selectedTypeView = () => {
    return (
      <>
        {modalType === "credit" && <ModalCredit />}
        {modalType === "address" && <ModalAddress />}
      </>
    );
  };

  return <>{selectedTypeView()}</>;
};

export default ModalTypeView;
