import React, { useState } from "react";
import Input from "Components/common/Input";
import Button from "Components/common/Button";
import EmailForms from "Components/SignUp/EmailForms";
import AuthTypeForm from "Components/SignUp/AuthTypeForm";
import Modal from "Components/common/Modal/Modal";
import AddressModal from "Components/common/Modal/AddressModal";
import SignupModal from "Components/common/Modal/SignupModal";
import CreditModal from "Components/common/Modal/CreditModal";
import { ClosedEye, OpenedEye, Person, Map, Card, Calendar } from "Assets/svg";
import { loadLocalStorage, saveLocalStorage, autoIncrementUserId } from "Utils/Storage";
import { AUTH_LEVEL, USER_STORAGE, SIGNUP_EMAIL_STATUS } from "Utils/constants";
import { validator } from "Utils/validator";
import { hashSync } from "Utils/bcrypt";
import {
  PasswordCheck,
  Wrapper,
  Form,
  PasswordPolicy,
  AddressWrapper,
  CreditCardWrapper,
} from "Pages/SignUp/style";
const SignUp = () => {
  const { defaultStatus, unConfirmed } = SIGNUP_EMAIL_STATUS;
  const [modalType, setModalType] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [emailDuplicateStatus, setEmailDuplicateStatus] = useState(defaultStatus);
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

  const isAllValid = (formData) => {
    for (const key in formData) {
      const value = formData[key];
      const validateFunction = validator[key];

      if (!validateFunction(value, formData.pw)) {
        setErrors({ ...errors, [key]: true });
        if (key === "pwCheck") setPasswordCheckError(true);
        return false;
      }
      setErrors({ ...errors, [key]: false });
    }
    return true;
  };

  const toggleModal = (modal) => {
    setModalType(modal);
    setModalOpen(!modalOpen);
  };

  const handleSetFormData = (key, value) => {
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
      setEmailDuplicateStatus(unConfirmed);
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

  return (
    <Wrapper>
      <Form onSubmit={handleSignupSubmit}>
        <h4>회원가입</h4>

        <AuthTypeForm
          value={formData.authority}
          onChange={handleSetFormData}
          errors={errors.authority}
        />

        <EmailForms
          value={formData.email}
          onChange={handleSignUpChange}
          errors={errors.email}
          setErrors={setErrors}
          {...{
            emailDuplicateStatus,
            setEmailDuplicateStatus,
            emailDuplicateChecked,
            setEmailDuplicateChecked,
          }}
        />

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
