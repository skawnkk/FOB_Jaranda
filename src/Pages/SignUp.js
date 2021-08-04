import React, { useState, useCallback } from "react";
import styled from "styled-components";
import Input from "Components/common/Input";
import Button from "Components/common/Button";
import checkIcon from "Assets/svg/check.svg";
import Modal from "Components/common/Modal/Modal";

import { ReactComponent as Mail } from "Assets/svg/mail.svg";
import { ReactComponent as ClosedEye } from "Assets/svg/eye_closed.svg";
import { ReactComponent as Person } from "Assets/svg/person.svg";
import { ReactComponent as Map } from "Assets/svg/map.svg";
import { ReactComponent as Card } from "Assets/svg/card.svg";
import { ReactComponent as Calendar } from "Assets/svg/calendar.svg";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [creditCard, setCreditCard] = useState("");
  const [birthday, setBirthday] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(false);

  const modalType = {
    credit: "credit",
    address: "address",
  };
  const toggleModal = () => {
    setIsOpen(!isOpen);
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
  const onChangeAddress = useCallback((e) => {
    setAddress(e.target.value);
  }, []);

  const onChangeCreditCard = useCallback((e) => {
    setCreditCard(e.target.value);
  }, []);

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
        <Input
          name="address"
          value={address}
          icon={<Map />}
          onChange={onChangeAddress}
          // onClick={}
          placeholder="주소를 입력하세요"
        />
        <Input
          name="creditcard"
          value={creditCard}
          icon={<Card />}
          onChange={onChangeCreditCard}
          // onClick={}
          placeholder="신용카드 정보를 입력하세요"
        />
        <Input
          name="birthday"
          value={birthday}
          icon={<Calendar />}
          onChange={onChangeBirthday}
          placeholder="생년월일 6자리를 입력하세요"
        />

        <Button type="submit" value="회원가입" marginTop="10px" />

        <div>
          <button onClick={toggleModal}>모달창!</button>
          <Modal
            isOpen={isOpen}
            toggleModal={toggleModal}
            title="신용카드 번호를 입력해 주세요"
            content="여기 추가하라주구아머ㅣ아러ㅓㅐㅁㅈ더리ㅏ추가해죠아니허미나ㅓㄻ쟈ㅐㄷ러테스트테ㅡ트테스트테스트"
            submitButton="true"
          />
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
`;

export default SignUp;
