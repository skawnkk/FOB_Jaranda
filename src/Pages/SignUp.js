import React, { useState } from "react";
import Modal from "Components/common/Modal/Modal";

const SignUp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalType = {
    success: "success",
    credit: "credit",
    address: "address",
  };
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={toggleModal}>모달창!</button>
      <Modal isOpen={isOpen} toggleModal={toggleModal} modalType={modalType.address} />
    </div>
  );
};

export default SignUp;
