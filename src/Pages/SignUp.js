import React, { useState, useEffect, useCallback } from "react";
import styled, { css } from "styled-components";
import Input from "Components/common/Input";
import Button from "Components/common/Button";
import Radio from "Components/common/Radio";
import Modal from "Components/common/Modal/Modal";
import { AUTH_LEVEL, USER_STORAGE } from "Utils/constants";
import { loadLocalStorage, saveLocalStorage } from "Utils/Storage";
import checkIcon from "Assets/svg/check.svg";
import { ReactComponent as Mail } from "Assets/svg/mail.svg";
import { ReactComponent as ClosedEye } from "Assets/svg/eye_closed.svg";
import { ReactComponent as OpenedEye } from "Assets/svg/eye_opened.svg";
import { ReactComponent as Person } from "Assets/svg/person.svg";
import { ReactComponent as Map } from "Assets/svg/map.svg";
import { ReactComponent as Card } from "Assets/svg/card.svg";
import { ReactComponent as Calendar } from "Assets/svg/calendar.svg";

import SignupModal from "Components/SignupModal";
import AddressModal from "Components/AddressModal";
import CreditModal from "Components/CreditModal";
import { hashSync } from "Utils/bcrypt";

import {
  isEmail,
  isPassword,
  isName,
  isDateOfBirth,
  isCreditNum,
  isEng,
  isPwNum,
  isSpe,
} from "Utils/validator.js";

const SignUp = () => {
  const [modalType, setModalType] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [passwordCheckError, setPasswordCheckError] = useState(false);
  const [passwordError, setPasswordError] = useState({
    pwNum: false,
    eng: false,
    spe: false,
    digit: false,
  });
  const [formData, setFormData] = useState({
    email: "",
    pw: "",
    pwCheck: "",
    name: "",
    address: "",
    dateOfBirth: "",
    creditCardNum: "",
  });

  const [authority, setAuthority] = useState(AUTH_LEVEL.unknown);
  const [passwordHide, setPasswordHide] = useState(true);
  const [errors, setErrors] = useState({
    id: false,
    authority: false,
    email: false,
    pw: false,
    name: false,
    address: false,
    dateOfBirth: false,
    creditCardNum: false,
  });

  const validator = {
    email: (email) => isEmail(email),
    pw: (pw) => isPassword(pw),
    // pwCheck: (pwCheck) => formData.pw === pwCheck,
    name: (name) => isName(name),
    address: (address) => !(address === ""),
    dateOfBirth: (dateOfBirth) => isDateOfBirth(dateOfBirth),
    creditCardNum: (creditCardNum) => isCreditNum(creditCardNum),
  };

  const isAllValid = (formData) => {
    const copyformData = { ...formData };
    delete copyformData.pwCheck;
    for (const name in copyformData) {
      console.log("name", name);
      const value = formData[name];
      const validateFunction = validator[name];
      if (!validateFunction(value)) {
        setErrors((prev) => ({
          ...prev,
          [name]: true,
        }));
        return false;
      } else {
        setErrors((prev) => ({
          ...prev,
          [name]: false,
        }));
      }
    }
    return true;
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // 위에 함수 formData
    const allValid = isAllValid(formData);
    if (allValid) {
      formData.authority = authority;
      formData.pw = hashSync(formData.pw, 8);
      delete formData.pwCheck;

      const userData = loadLocalStorage(USER_STORAGE);
      const user = { ...formData, authority: authority };
      userData
        ? saveLocalStorage(USER_STORAGE, [...userData, user])
        : saveLocalStorage(USER_STORAGE, [user]);
      toggleModal("success");
    } else {
      //하단에 에러메세지 제시
    }
  };

  const onChangeHandler = useCallback(
    (e) => {
      const { name, value } = e.target;
      if (name === "pwCheck") {
        setPasswordCheckError(value !== formData.pw);
        setFormData({ ...formData, pwCheck: value });
      }
      if (name === "pw") {
        setPasswordError({
          ...passwordError,
          eng: isEng(value) >= 0,
          pwNum: isPwNum(value) >= 0,
          spe: isSpe(value) >= 0,
          digit: value.length >= 8,
        });
      }
      console.log(passwordError);
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [formData.pw, formData.pwCheck]
  );

  const handleSetAddressValue = (address) => {
    setFormData({
      ...formData,
      address,
    });
  };

  const handleSetCardValue = (creditCardNum) => {
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
      <Form onSubmit={handleSignupSubmit} passwordError={passwordError}>
        <h4>회원가입</h4>
        <Radio
          value={authority}
          name="authority"
          onChange={setAuthority}
          data={[
            { value: AUTH_LEVEL.teacher, label: "선생님" },
            { value: AUTH_LEVEL.parent, label: "부모님" },
          ]}
          // error={errors.authority}
          // errorMessage={errors.authority}
        />
        <div className="email-wrapper">
          <Input
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
            placeholder="이메일을 입력하세요"
            icon={<Mail />}
            error={errors.email}
            errorMessage="이메일을 다시 입력해 주세요"
            width="75%"
          />
          <Button type="submit" value="중복확인" width="20%" />
        </div>
        <Input
          type={passwordHide ? "password" : "text"}
          name="pw"
          value={formData.pw}
          onChange={onChangeHandler}
          icon={
            passwordHide ? (
              <ClosedEye onClick={() => setPasswordHide(!passwordHide)} />
            ) : (
              <OpenedEye onClick={() => setPasswordHide(!passwordHide)} />
            )
          }
          placeholder="비밀번호를 입력하세요"
          error={errors.pw}
          errorMessage="비밀번호를 다시 입력해 주세요"
        />
        <div className="password-policy">
          <div>
            <span className="password-pwNum">숫자</span>
          </div>
          <div>
            <span className="password-spe">특수문자</span>
          </div>
          <div>
            <span className="password-eng">영문</span>
          </div>
          <div>
            <span className="password-digit">8자리 이상</span>
          </div>
        </div>
        <Input
          type={passwordHide ? "password" : "text"}
          name="pwCheck"
          value={formData.pwCheck}
          onChange={onChangeHandler}
          icon={
            passwordHide ? (
              <ClosedEye onClick={() => setPasswordHide(!passwordHide)} />
            ) : (
              <OpenedEye onClick={() => setPasswordHide(!passwordHide)} />
            )
          }
          placeholder="비밀번호를 다시 입력하세요"
          error={passwordCheckError}
          errorMessage="비밀번호를 다시 입력해 주세요"
        />
        <Input
          name="name"
          value={formData.name}
          icon={<Person />}
          onChange={onChangeHandler}
          placeholder="이름을 입력하세요"
          error={errors.name}
          errorMessage="이름을 다시 입력해 주세요"
        />

        <div className="address-wrapper">
          <div className="address-main" onClick={() => toggleModal("address")}>
            <Input
              name="address"
              value={formData.address}
              icon={<Map />}
              onChange={() => {}}
              placeholder="주소를 입력하세요"
              error={errors.address}
              errorMessage="주소를 다시 입력해 주세요"
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
            error={errors.creditCardNum}
            errorMessage="카드번호를 다시 입력해 주세요"
          />
          <span>번호입력</span>
        </div>

        <Input
          name="dateOfBirth"
          value={formData.dateOfBirth}
          icon={<Calendar />}
          onChange={onChangeHandler}
          placeholder="생년월일 6자리를 입력하세요"
          error={errors.dateOfBirth}
          maxLength={6}
          errorMessage="생년월일을 다시 입력해 주세요"
        />

        <Button type="submit" value="회원가입" marginTop="10px" />

        <Modal isOpen={isOpen} toggleModal={toggleModal}>
          <>
            {modalType === "success" && <SignupModal />}
            {modalType === "address" && (
              <AddressModal toggleModal={toggleModal} onSelected={handleSetAddressValue} />
            )}
            {modalType === "credit" && (
              <CreditModal
                creditCard={formData.creditCardNum}
                onSelected={handleSetCardValue}
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

  h4 {
    font-size: 30px;
    margin-bottom: 20px;
    font-weight: 500;
    text-align: center;
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
        font-size: 16px;
      }
      &::before {
        display: inline-block;
        background: url(${checkIcon});
        content: "";
        width: 20px;
        height: 16px;
      }
      .password-pwNum {
        ${(props) =>
          props.passwordError.pwNum &&
          css`
            color: ${({ theme }) => theme.color.red};
          `};
      }
      .password-eng {
        ${(props) =>
          props.passwordError.eng &&
          css`
            color: ${({ theme }) => theme.color.red};
          `};
      }
      .password-spe {
        ${(props) =>
          props.passwordError.spe &&
          css`
            color: ${({ theme }) => theme.color.red};
          `};
      }
      .password-digit {
        ${(props) =>
          props.passwordError.digit &&
          css`
            color: ${({ theme }) => theme.color.red};
          `};
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
