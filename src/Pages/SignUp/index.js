import React, { useState, useEffect } from "react";
import Input from "Components/common/Input";
import Button from "Components/common/Button";
import Radio from "Components/common/Radio";
import Modal from "Components/common/Modal/Modal";
import AddressModal from "Components/common/Modal/AddressModal";
import SignupModal from "Components/common/Modal/SignupModal";
import CreditModal from "Components/common/Modal/CreditModal";
import { hashSync } from "Utils/bcrypt";
import { AUTH_LEVEL, USER_STORAGE } from "Utils/constants";
import { loadLocalStorage, saveLocalStorage, autoIncrementUserId } from "Utils/Storage";
import { Mail, ClosedEye, OpenedEye, Person, Map, Card, Calendar } from "Assets/svg";
import { RegExr } from "Utils/RegExr";
import {
  PasswordCheck,
  Wrapper,
  Form,
  EmailWrapper,
  PasswordPolicy,
  AddressWrapper,
  CreditCardWrapper,
} from "Pages/SignUp/style";

const SignUp = () => {
  const [modalType, setModalType] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [emailDuplicateStatus, setEmailDuplicateStatus] = useState(SIGNUP_EMAIL_STATUS.default);
  const [emailDuplicateChecked, setEmailDuplicateChecked] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(true);
  const [passwordCheckError, setPasswordCheckError] = useState(false);
  const [passwordError, setPasswordError] = useState({
    pwNumber: false,
    pwEnglish: false,
    pwSpecialCharacter: false,
    pwLength: false,
  });
  const [formData, setFormData] = useState({
    authority: AUTH_LEVEL.unknown,
    email: "",
    pw: "",
    pwCheck: "",
    name: "",
    address: "",
    detailAddress: "",
    creditCardNum: "",
    dateOfBirth: "",
  });
  const initialErrorState = {
    authority: false,
    email: false,
    pw: false,
    pwCheck: false,
    name: false,
    address: false,
    detailAddress: false,
    creditCardNum: false,
    dateOfBirth: false,
  };

  const [errors, setErrors] = useState(initialErrorState);

  const validator = {
    authority: (authority) => !(authority === AUTH_LEVEL.unknown),
    email: (email) => RegExr.email.test(email),
    pw: (pw) => RegExr.password.test(pw),
    pwCheck: (pwCheck) => pwCheck === formData.pw,
    name: (name) => RegExr.name.test(name),
    address: (address) => !(address === ""),
    detailAddress: (detailAddress) => !(detailAddress === ""),
    dateOfBirth: (dateOfBirth) => RegExr.dateOfBirth.test(dateOfBirth),
    creditCardNum: (creditCardNum) => RegExr.creditNumber.test(creditCardNum),
    pwEnglish: (pw) => pw.search(RegExr.pwEnglish) >= 0,
    pwNumber: (pw) => pw.search(RegExr.pwNumber) >= 0,
    pwSpecialCharacter: (pw) => pw.search(RegExr.pwSpecialCharacter) >= 0,
    pwLength: (pw) => pw.length >= 8,
  };

  const isAllValid = (formData) => {
    for (const key in formData) {
      const value = formData[key];
      const validateFunction = validator[key];

      if (!validateFunction(value)) {
        setErrors({ ...errors, [key]: true });
        if (key === "pwCheck") setPasswordCheckError(true);
        return false;
      }
      setErrors({ ...errors, [key]: false });
    }
    return true;
  };

  const SIGNUP_EMAIL_STATUS = {
    default: 0,
    invalidType: 1,
    unConfirmed: 2,
    confirmedFailure: 3,
    confirmedSuccess: 4,
  };
  const handleClickDuplicateCheck = () => {
    setEmailDuplicateChecked(true);
    //이메일 형식 체크
    if (!validator.email(formData.email)) {
      setErrors({ ...errors, email: true });
      setEmailDuplicateStatus(SIGNUP_EMAIL_STATUS.invalidType);
      return;
    }
    //중복 체크
    const userData = loadLocalStorage(USER_STORAGE);
    const searchSameEmail = userData.filter((user) => user.email === formData.email);
    if (searchSameEmail.length) {
      setErrors({ ...errors, email: true });
      setEmailDuplicateStatus(SIGNUP_EMAIL_STATUS.confirmedFailure);
    } else {
      setErrors({ ...errors, email: false });
      setEmailDuplicateStatus(SIGNUP_EMAIL_STATUS.confirmedSuccess);
    }
  };

  const getEmailStatusMessage = (status) => {
    let message = errors.email ? "이메일을 입력하세요" : "";
    if (status === SIGNUP_EMAIL_STATUS.invalidType) message = "이메일 형식을 확인해주세요";
    else if (status === SIGNUP_EMAIL_STATUS.unConfirmed) message = "중복 검사를 진행해주세요";
    else if (status === SIGNUP_EMAIL_STATUS.confirmedFailure) message = "중복된 이메일 입니다.";
    return message;
  };

  const toggleModal = (modal) => {
    setModalType(modal);
    setModalOpen(!modalOpen);
  };

  const handleSetFormData = (key, value) => {
    console.log(value);
    setErrors({ ...errors, [key]: false });
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    handleSetFormData(name, value);

    if (name === "email") setEmailDuplicateChecked(false);
    //이메일이 형식에 다 맞게되면 중복검사 입력이 가능하도록 수정하기
    if (name === "pw") {
      setPasswordError({
        ...passwordError,
        pwEnglish: validator.pwEnglish(value),
        pwNumber: validator.pwNumber(value),
        pwSpecialCharacter: validator.pwSpecialCharacter(value),
        pwLength: validator.pwLength(value),
      });
    }
    if (name === "pwCheck") setPasswordCheckError(value !== formData.pw);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    if (!emailDuplicateChecked) {
      setErrors({ ...errors, email: true });
      setEmailDuplicateStatus(SIGNUP_EMAIL_STATUS.unConfirmed);
      return;
    }

    if (isAllValid(formData)) {
      formData.id = autoIncrementUserId();
      formData.pw = hashSync(formData.pw, 8);
      delete formData.pwCheck;

      const userData = loadLocalStorage(USER_STORAGE);
      saveLocalStorage(USER_STORAGE, [...userData, formData]);
      toggleModal("success");
    }
  };

  const AuthTypes = [
    { value: AUTH_LEVEL.teacher, label: "선생님" },
    { value: AUTH_LEVEL.parent, label: "부모님" },
  ];

  return (
    <Wrapper>
      <Form onSubmit={handleSignupSubmit}>
        <h4>회원가입</h4>

        <Radio
          name="authority"
          value={formData.authority}
          onChange={handleSetFormData}
          data={AuthTypes}
          error={errors.authority}
          errorMessage="원하시는 계정 유형을 선택해 주세요."
        />

        <EmailWrapper>
          <Input
            name="email"
            value={formData.email}
            onChange={handleSignUpChange}
            placeholder="이메일을 입력하세요"
            icon={<Mail />}
            error={errors.email}
            errorMessage={getEmailStatusMessage(emailDuplicateStatus)}
            successMessage={emailDuplicateChecked && "사용 가능한 이메일 입니다"}
            width="75%"
          />
          <Button value="중복확인" width="20%" onClick={handleClickDuplicateCheck} />
        </EmailWrapper>

        <Input
          name="pw"
          value={formData.pw}
          onChange={handleSignUpChange}
          placeholder="비밀번호를 입력하세요"
          type={visiblePassword ? "password" : "text"}
          icon={
            visiblePassword ? (
              <ClosedEye onClick={() => setVisiblePassword(!visiblePassword)} />
            ) : (
              <OpenedEye onClick={() => setVisiblePassword(!visiblePassword)} />
            )
          }
          error={errors.pw}
          errorMessage="비밀번호를 다시 입력해 주세요"
        />

        <PasswordPolicy passwordError={passwordError}>
          <PasswordCheck check={passwordError.pwNumber}>숫자 </PasswordCheck>
          <PasswordCheck check={passwordError.pwSpecialCharacter}>특수문자</PasswordCheck>
          <PasswordCheck check={passwordError.pwEnglish}>영문</PasswordCheck>
          <PasswordCheck check={passwordError.pwLength}>8자리 이상</PasswordCheck>
        </PasswordPolicy>

        <Input
          name="pwCheck"
          value={formData.pwCheck}
          onChange={handleSignUpChange}
          placeholder="비밀번호를 다시 입력하세요"
          type={visiblePassword ? "password" : "text"}
          icon={
            visiblePassword ? (
              <ClosedEye onClick={() => setVisiblePassword(!visiblePassword)} />
            ) : (
              <OpenedEye onClick={() => setVisiblePassword(!visiblePassword)} />
            )
          }
          error={passwordCheckError}
          errorMessage="비밀번호를 다시 입력해 주세요"
        />

        <Input
          name="name"
          value={formData.name}
          onChange={handleSignUpChange}
          placeholder="이름을 입력하세요"
          icon={<Person />}
          error={errors.name}
          errorMessage="이름을 입력해 주세요"
        />

        <AddressWrapper>
          <div className="address-main" onClick={() => toggleModal("address")}>
            <Input
              name="address"
              value={formData.address}
              placeholder="주소를 입력하세요"
              icon={<Map />}
              error={errors.address}
              errorMessage="주소를 입력해 주세요"
            />
            <span>주소검색</span>
          </div>
          {formData.address && (
            <Input
              name="detailAddress"
              value={formData.detailAddress}
              onChange={handleSignUpChange}
              placeholder="상세주소를 입력하세요"
              icon={<Map />}
              error={errors.detailAddress}
              errorMessage="상세주소를 다시 입력해 주세요"
            />
          )}
        </AddressWrapper>

        <CreditCardWrapper onClick={() => toggleModal("credit")}>
          <Input
            name="creditCardNum"
            value={formData.creditCardNum}
            placeholder="신용카드 정보를 입력하세요"
            icon={<Card />}
            error={errors.creditCardNum}
            errorMessage="카드번호를 다시 입력해 주세요"
          />
          <span>번호입력</span>
        </CreditCardWrapper>

        <Input
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleSignUpChange}
          placeholder="생년월일 6자리를 입력하세요"
          icon={<Calendar />}
          error={errors.dateOfBirth}
          maxLength={6}
          errorMessage="생년월일을 다시 입력해 주세요"
        />

        <Button type="submit" value="회원가입" marginTop="10px" />

        <Modal isOpen={modalOpen} toggleModal={toggleModal} modalType={modalType}>
          <>
            {modalType === "success" && <SignupModal />}
            {modalType === "address" && (
              <AddressModal toggleModal={toggleModal} onSelected={handleSetFormData} />
            )}

            {modalType === "credit" && (
              <CreditModal
                creditCard={formData.creditCardNum}
                handleSetCardNum={handleSetFormData}
                toggleModal={toggleModal}
              />
            )}
          </>
        </Modal>
      </Form>
    </Wrapper>
  );
};

export default SignUp;
