import React from "react";
import Modal from "Components/common/Modal/Modal";
import AddressModal from "Components/common/Modal/AddressModal";
import Input from "Components/common/Input";
import { Map } from "Assets/svg";
import styled from "styled-components";

export const AdressForm = ({
  address,
  detailAddress,
  toggleModal,
  addressError,
  detailAddressError,
  isOpen,
  modalType,
  handleSetFormData,
}) => {
  const handleDetailAddress = (e) => {
    const { name, value } = e.target;
    handleSetFormData(name, value);
  };
  return (
    <>
      <AddressWrapper>
        <div className="address-main" onClick={() => toggleModal("address")}>
          <Input
            name="address"
            value={address}
            placeholder="주소를 입력하세요"
            icon={<Map />}
            error={addressError}
            errorMessage="주소를 입력해 주세요"
          />
          <span>주소검색</span>
        </div>
        {address && (
          <Input
            name="detailAddress"
            value={detailAddress}
            onChange={handleDetailAddress}
            placeholder="상세주소를 입력하세요"
            icon={<Map />}
            error={detailAddressError}
            errorMessage="상세주소를 다시 입력해 주세요"
          />
        )}
      </AddressWrapper>

      <Modal {...{ isOpen, toggleModal, modalType }}>
        {modalType === "address" && (
          <AddressModal toggleModal={toggleModal} onSelected={handleSetFormData} />
        )}
      </Modal>
    </>
  );
};

const AddressWrapper = styled.div`
  position: relative;

  span {
    position: absolute;
    top: 12.5px;
    right: 2px;
    color: ${({ theme }) => theme.color.green};
    font-size: 13px;
    font-weight: 600;
    padding: 10px 50px 13px 0;
    cursor: pointer;
    background-color: white;
  }
  svg {
    z-index: 1;
  }
`;
