import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Input from "Components/common/Input";
import Button from "Components/common/Button";
import Radio from "Components/common/Radio";
import Modal from "Components/common/Modal/Modal";
import { AUTH_LEVEL, USER_STORAGE } from "Utils/constants";
import { loadLocalStorage, saveLocalStorage } from "Utils/Storage";
import checkIcon from "Assets/svg/check.svg";
import { ReactComponent as Mail } from "Assets/svg/mail.svg";
import { ReactComponent as ClosedEye } from "Assets/svg/eye_closed.svg";
import { ReactComponent as Person } from "Assets/svg/person.svg";
import { ReactComponent as Map } from "Assets/svg/map.svg";
import { ReactComponent as Card } from "Assets/svg/card.svg";
import { ReactComponent as Calendar } from "Assets/svg/calendar.svg";

import SignupModal from "Components/SignupModal";
import AddressModal from "Components/AddressModal";
import CreditModal from "Components/CreditModal";

const SignUp = () => {
  const [modalType, setModalType] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    email: "",
    pw: "",
    pwCheck: "",
    name: "",
    address: "",
    dateOfBirth: "",
    creditCardNum: "",
  });
  const [authority, setAuthority] = useState(AUTH_LEVEL.unknown);
  const [errorMsg, setErrorMsg] = useState({
    id: { error: false, message: "" },
    authority: { error: false, message: "" },
    email: { error: false, message: "" },
    pw: { error: false, message: "" },
    name: { error: false, message: "" },
    address: { error: false, message: "" },
    dateOfBirth: { error: false, message: "" },
    creditCardNum: { error: false, message: "" },
  });

  const checkValidation = () => {
    //email
    // 조건에 안맞으면 errorMsg 값 수정
    let checkArray = [];
    if (!formData.email) {
      checkArray.push("email");
      onChangeErrorMsgHandler("email", "이메일을 확인해주세요");
    }
    //pw

    if (!formData.pw) {
      checkArray.push("pw");
      onChangeErrorMsgHandler("pw", "패스워드를 확인해주세요");
    }
    //pwCheck
    //name ...

    //step2. errorMsg.filter : error 트루인게 있으면 return false;
    // errorMsg.filter : error 트루인게 없으면 return true;

    return true;
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    if (checkValidation()) {
      //성공(success) => true
      setAuthority(authority);
      console.log(authority);
      const userData = loadLocalStorage(USER_STORAGE);
      const user = [{ ...formData, authority: authority }];
      saveLocalStorage(USER_STORAGE, userData.concat(user));
    } else {
      //하단에 에러메세지 제시
    }
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onChangeErrorMsgHandler = (key, message) => {
    setErrorMsg({
      ...formData,
      [key]: { error: true, message },
    });
  };

  const setAddressValue = (address) => {
    setFormData({
      ...formData,
      address,
    });
  };
  const setCardValue = (creditCardNum) => {
    setFormData({
      ...formData,
      creditCardNum,
    });
  };

  const toggleModal = (modal) => {
    setIsOpen(!isOpen);
    setModalType(modal);
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <Wrapper>
      <Form onSubmit={handleSignupSubmit}>
        <Radio
          value={authority}
          name="authority"
          onChange={setAuthority}
          icon={<Mail />}
          data={[
            { value: AUTH_LEVEL.teacher, label: "선생님" },
            { value: AUTH_LEVEL.parent, label: "부모님" },
          ]}
          // error={errorMsg.authority.error}
          // errorMessage={errorMsg.authority.message}
        />
        <div className="email-wrapper">
          <Input
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
            placeholder="이메일을 입력하세요"
            icon={<Mail />}
            error={errorMsg.email.error}
            errorMessage={errorMsg.email.message}
            width="75%"
          />
          <Button type="submit" value="중복확인" width="20%" />
        </div>
        <Input
          type="password"
          name="pw"
          value={formData.pw}
          onChange={onChangeHandler}
          icon={<ClosedEye />}
          placeholder="비밀번호를 입력하세요"
          error={errorMsg.pw.error}
          errorMessage={errorMsg.pw.message}
        />
        <div className="password-policy">
          <div>
            <span>숫자</span>
          </div>
          <div>
            <span>특수문자</span>
          </div>
          <div>
            <span>영문</span>
          </div>
          <div>
            <span>8자리 이상</span>
          </div>
        </div>
        <Input
          type="password"
          name="pwCheck"
          value={formData.pwCheck}
          onChange={onChangeHandler}
          icon={<ClosedEye />}
          placeholder="비밀번호를 다시 입력하세요"
          error={false}
          errorMessage={false}
        />
        <Input
          name="name"
          value={formData.name}
          icon={<Person />}
          onChange={onChangeHandler}
          placeholder="이름을 입력하세요"
          error={errorMsg.name.error}
          errorMessage={errorMsg.name.message}
        />

        <div className="address-wrapper">
          <div className="address-main" onClick={() => toggleModal("address")}>
            <Input
              name="address"
              value={formData.address}
              icon={<Map />}
              onChange={() => {}}
              placeholder="주소를 입력하세요"
              error={errorMsg.address.error}
              errorMessage={errorMsg.address.message}
            />
            <span>주소검색</span>
          </div>
          {formData.address && (
            <Input
              name="detailAddress"
              value={formData.detailAddress}
              icon={<Map />}
              onChange={onChangeHandler}
              placeholder="상세주소를 입력하세요"
              error={false}
              errorMessage={false}
            />
          )}
        </div>

        <div className="creditcard-wrapper" onClick={() => toggleModal("credit")}>
          <Input
            name="creditCardNum"
            value={formData.creditCardNum}
            icon={<Card />}
            placeholder="신용카드 정보를 입력하세요"
            error={errorMsg.creditCardNum.error}
            errorMessage={errorMsg.creditCardNum.message}
          />
          <span>번호입력</span>
        </div>

        <Input
          name="dateOfBirth"
          value={formData.dateOfBirth}
          icon={<Calendar />}
          onChange={onChangeHandler}
          placeholder="생년월일 6자리를 입력하세요"
          error={errorMsg.dateOfBirth.error}
          errorMessage={errorMsg.dateOfBirth.message}
        />

        <Button type="submit" value="회원가입" marginTop="10px" />

        <Modal isOpen={isOpen} toggleModal={toggleModal}>
          <>
            {modalType === "success" && <SignupModal />}
            {modalType === "address" && (
              <AddressModal toggleModal={toggleModal} onSelected={setAddressValue} />
            )}
            {modalType === "credit" && (
              <CreditModal
                creditCard={formData.creditCardNum}
                onSelected={setCardValue}
                toggleModal={toggleModal}
              />
            )}
          </>
        </Modal>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${({ theme }) => theme.flexSet("center", "center", "column")};
  width: 100%;
  height: calc(100% - 72px);
`;

const Form = styled.form`
  width: 600px;
  padding: 40px;
  border: 1px solid ${({ theme }) => theme.color.borderline};

  @media (max-width: 768px) {
    width: 100%;
    padding: 40px 0;
  }

  > .email-wrapper {
    ${({ theme }) => theme.flexSet("space-between")};
  }

  > .password-policy {
    ${({ theme }) => theme.flexSet("space-around")};

    > div {
      span {
        color: ${({ theme }) => theme.color.borderline};
        text-align: center;
      }
      &::before {
        display: inline-block;
        background: url(${checkIcon});
        content: "";
        width: 20px;
        height: 16px;
      }
    }
  }

  .address-wrapper {
    position: relative;

    span {
      position: absolute;
      top: 12.5px;
      right: 50px;
      color: ${({ theme }) => theme.color.green};
      font-size: 10pt;
      font-weight: 600;
      padding: 10px 0;
      cursor: pointer;
    }
  }

  .creditcard-wrapper {
    position: relative;

    span {
      position: absolute;
      top: 12.5px;
      right: 50px;
      color: ${({ theme }) => theme.color.green};
      font-size: 10pt;
      font-weight: 600;
      padding: 10px 0;
      cursor: pointer;
    }
  }
`;

export default SignUp;
