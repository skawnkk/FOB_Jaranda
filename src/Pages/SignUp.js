import React, { useState, useCallback } from "react";
import styled from "styled-components";
import Input from "Components/common/Input";
import Button from "Components/common/Button";
import Modal from "Components/common/Modal/Modal";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [datailAddress, setDetailAddress] = useState("");
  const [creditCard, setCreditCard] = useState("");
  const [birthday, setBirthday] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [modalType, setModalType] = useState("");

  // const modalType = {
  //   success: "success",
  //   credit: "credit",
  //   address: "address",
  // };
  const toggleModal = (modal) => {
    setIsOpen(!isOpen);
    setModalType(modal);
  };

  const nameCheck = () => {
    const nameRegex = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
    return nameRegex.test(userName);
  };

  const birthCheck = () => {
    const birthRegex = /([0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[1,2][0-9]|3[0,1]))/;
    return birthRegex.test(birthday);
  };
  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  // 중복하는 이메일 체크(localStorage 연동 필요)
  // const onCheckEmail = () => {};
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);
  const onChangeCheckPassword = useCallback((e) => {
    setCheckPassword(e.target.value);
  }, []);
  const onChangeName = useCallback((e) => {
    setUserName(e.target.value);
  }, []);

  // 주소, 신용카드 모달 팝업 후 작업
  // const onChangeAddress = useCallback((e) => {
  //   setAddress(e.target.value);
  // }, []);
  const setAddressValue = (address) => {
    setAddress(address);
  };

  const onChangeDetailAddress = useCallback((e) => {
    setDetailAddress(e.target.value);
  }, []);

  const setCardValue = (cardNumber) => {
    setCreditCard(cardNumber);
  };

  // const onChangeCreditCard = useCallback((e) => {
  //   setCreditCard(e.target.value);
  // }, []);

  const onChangeBirthday = useCallback((e) => {
    setBirthday(e.target.value);
  }, []);
  const handleSignupSubmit = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <Wrapper>
      <Form onSubmit={handleSignupSubmit}>
        <div className="email-wrapper">
          <Input
            name="email"
            value={email}
            onChange={onChangeEmail}
            placeholder="이메일을 입력하세요"
            icon={<Mail />}
            error={email.length ? true : false}
            errorMessage="이메일을 입력하세요"
            width="75%"
          />
          <Button type="submit" value="중복확인" width="20%" />
        </div>
        <Input
          type="password"
          name="password"
          value={password}
          onChange={onChangePassword}
          icon={<ClosedEye />}
          placeholder="비밀번호를 입력하세요"
          error={password === "123" ? true : false}
          errorMessage="비밀번호를 입력하세요"
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
          name="password"
          value={checkPassword}
          onChange={onChangeCheckPassword}
          icon={<ClosedEye />}
          placeholder="비밀번호를 다시 입력하세요"
          error={checkPassword !== password ? true : false}
          errorMessage="비밀번호가 일치하지 않습니다"
        />
        <Input
          name="username"
          value={userName}
          icon={<Person />}
          onChange={onChangeName}
          placeholder="이름을 입력하세요"
        />

        <div className="address-wrapper">
          <div className="address-main" onClick={() => toggleModal("address")}>
            <Input
              name="address"
              value={address}
              icon={<Map />}
              onChange={() => {}}
              placeholder="주소를 입력하세요"
            />
            <span>주소검색</span>
          </div>
          {address && (
            <Input
              name="datailAddress"
              value={datailAddress}
              icon={<Map />}
              onChange={onChangeDetailAddress}
              placeholder="상세주소를 입력하세요"
            />
          )}
        </div>

        <div className="creditcard-wrapper" onClick={() => toggleModal("credit")}>
          <Input
            name="creditcard"
            value={creditCard}
            icon={<Card />}
            onChange={() => {}}
            placeholder="신용카드 정보를 입력하세요"
          />
          <span>번호입력</span>
        </div>

        <Input
          name="birthday"
          value={birthday}
          icon={<Calendar />}
          onChange={onChangeBirthday}
          placeholder="생년월일 6자리를 입력하세요"
        />

        <Button type="submit" value="회원가입" marginTop="10px" />

        <button onClick={() => toggleModal("success")}>회원가입</button>
        <button onClick={() => toggleModal("address")}>주소검색</button>
        <button onClick={() => toggleModal("credit")}>신용카드</button>

        <Modal isOpen={isOpen} toggleModal={toggleModal}>
          <>
            {modalType === "success" && <SignupModal />}
            {modalType === "address" && (
              <AddressModal toggleModal={toggleModal} onSelected={setAddressValue} />
            )}
            {modalType === "credit" && (
              <CreditModal
                creditCard={creditCard}
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
        height: 20px;
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
