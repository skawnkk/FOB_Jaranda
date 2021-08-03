import React, { useState, useCallback } from "react";
import styled from "styled-components";
import Input from "Components/common/Input";
import checkIcon from "assets/svg/check.svg";
import Modal from "Components/common/Modal/Modal";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [creditCard, setCreditCard] = useState("");
  const [birthday, setBirthday] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const modalType = {
    success: "success",
    credit: "",
    address: "address",
  };
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };  
  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);
  const onCheckEmail = () => {};
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);
  const onChangeCheckPassword = useCallback((e) => {
    setCheckPassword(e.target.value);
  }, []);
  const onChangeName = useCallback((e) => {
    setUserName(e.target.value);
  }, []);
  const onChangeAddress = useCallback((e) => {
    setAddress(e.target.value);
  }, []);
  const onChangeCreditCard = useCallback((e) => {
    setCreditCard(e.target.value);
  }, []);
  const onChangeBirthday = useCallback((e) => {
    setBirthday(e.target.value);
  }, []);
  const handleSignupSubmit = useCallback((e) => {}, []);

  return (
    <Wrapper>
      <Form onSubmit={handleSignupSubmit}>
        <div className="email-wrapper">
          <Input
            name="email"
            value={email}
            onChange={onChangeEmail}
            placeholder="이메일을 입력하세요"
            error={email.length ? true : false}
            errorMessage="이메일을 입력하세요"
          />
          <button
            type="submit"
            onClick={onCheckEmail}
            style={{ height: "50px", backgroundColor: "#78e08f", width: "30%", color: "white" }}>
            중복 확인
          </button>
        </div>
        <Input
          type="password"
          name="password"
          value={password}
          onChange={onChangePassword}
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
          placeholder="비밀번호를 다시 입력하세요"
          error={checkPassword !== password ? true : false}
          errorMessage="비밀번호가 일치하지 않습니다"
        />
        <Input
          name="username"
          value={userName}
          onChange={onChangeName}
          placeholder="이름을 입력하세요"
        />
        <Input
          name="address"
          value={address}
          onChange={onChangeAddress}
          // onClick={}
          placeholder="주소를 입력하세요"
        />
        <Input
          name="creditcard"
          value={creditCard}
          onChange={onChangeCreditCard}
          // onClick={}
          placeholder="신용카드 정보를 입력하세요"
        />
        <Input
          name="birthday"
          value={birthday}
          onChange={onChangeBirthday}
          placeholder="생년월일 6자리를 입력하세요"
        />

        <button
          type="submit"
          style={{
            height: "50px",
            backgroundColor: "#78e08f",
            width: "100%",
            color: "white",
            marginTop: "10px",
          }}>
          회원가입
        </button>
        <div>
          <button onClick={toggleModal}>모달창!</button>
          <Modal isOpen={isOpen} toggleModal={toggleModal} modalType={modalType.credit} />
        </div>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${({ theme }) => theme.flexSet("center", "center", "column")};
  height: calc(100% - 72px);
`;

const Form = styled.form`
  width: 450px;
  padding: 40px;
  border: 1px solid ${({ theme }) => theme.color.borderline};

  @media (max-width: 768px) {
    width: 100%;
    padding: 40px 0;
  }

  Input {
    margin-top: 10px;
  }

  > .email-wrapper {
    ${({ theme }) => theme.flexSet("space-between")};
  }

  > .password-policy {
    ${({ theme }) => theme.flexSet("space-around")};

    > div {
      span {
        color: ${({ theme }) => theme.color.borderline};
      }
      &::before {
        display: inline-block;
        background: url(${checkIcon});
        content: "";
        width: 20px;
        height: 20px;
        /* margin: auto 10px; */
        /* border: 1px solid red;
      width: 20px;
      height: 20px;
      border: 1px solid blue; */
      }
    }
  }
`;

export default SignUp;
