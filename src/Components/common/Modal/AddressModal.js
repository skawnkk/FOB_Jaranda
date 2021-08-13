import React from "react";
import DaumPostcode from "react-daum-postcode";

const AddressModal = ({ toggleModal, onSelected }) => {
  const handlePostCode = (data) => {
    let fullAddress = "[" + data.zonecode + "] " + data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") extraAddress += data.bname;

      if (data.buildingName !== "") {
        extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    onSelected("address", fullAddress);
    toggleModal();
  };

  const addressStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "block",
    width: "500px",
    height: "500px",
    border: "1px solid #87BF44",
    zIndex: 9999,
  };

  return <DaumPostcode style={addressStyle} onComplete={handlePostCode} />;
};

export default AddressModal;
