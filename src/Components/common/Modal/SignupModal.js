import React from "react";
import ModalCredit from "Components/common/Modal/ModalCredit";
import ModalAddress from "Components/common/Modal/ModalAddress";

const SignupModal = (props) => {
  const { modalType } = props;
  return <div>{modalType === "credit" ? <ModalCredit /> : <ModalAddress />}</div>;
};

export default SignupModal;
