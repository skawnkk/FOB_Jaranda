import React, { useState } from "react";
import Button from "Components/common/Button";
import Modal from "Components/common/Modal/Modal";
import SignupModal from "Components/common/Modal/SignupModal";
import { Wrapper, Form } from "Pages/SignUp/style";
import {
  EmailForm,
  AuthTypeForm,
  PasswordForm,
  NameForm,
  AdressForm,
  CreditForm,
  BirthForm,
} from "Components/SignUp";
import { loadLocalStorage, saveLocalStorage, autoIncrementUserId } from "Utils/Storage";
import { AUTH_LEVEL, USER_STORAGE, SIGNUP_EMAIL_STATUS } from "Utils/constants";
import { validator } from "Utils/validator";
import { hashSync } from "Utils/bcrypt";

const SignUp = () => {
  const { defaultStatus, unConfirmed } = SIGNUP_EMAIL_STATUS;
  const [modalType, setModalType] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [emailDuplicateStatus, setEmailDuplicateStatus] = useState(defaultStatus);
  const [emailDuplicateChecked, setEmailDuplicateChecked] = useState(false);
  const [passwordCheckError, setPasswordCheckError] = useState(false);

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
      const validateFunction = (value, pwValue) => validator[key](value, pwValue);

      if (!validateFunction(value, formData.pw)) {
        setErrors({ ...errors, [key]: true });
        if (key === "pwCheck") setPasswordCheckError(true);
        return false;
      }
      setErrors({ ...errors, [key]: false });
    }
    return true;
  };

  const handleSetFormData = (key, value) => {
    setErrors({ ...errors, [key]: false });
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!formData.email) {
      setErrors({ ...errors, email: true });
      setEmailDuplicateStatus(defaultStatus);
      return;
    }
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

  const toggleModal = (modal) => {
    setModalType(modal);
    setModalOpen(!modalOpen);
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

        <EmailForm
          value={formData.email}
          errors={errors.email}
          setErrors={setErrors}
          {...{
            handleSetFormData,
            emailDuplicateStatus,
            setEmailDuplicateStatus,
            emailDuplicateChecked,
            setEmailDuplicateChecked,
          }}
        />

        <PasswordForm
          pw={formData.pw}
          pwCheck={formData.pwCheck}
          pwError={errors.pwError}
          pwCheckError={passwordCheckError}
          {...{ handleSetFormData, setPasswordCheckError }}
        />

        <NameForm value={formData.name} error={errors.name} handleSetFormData={handleSetFormData} />

        <AdressForm
          address={formData.address}
          detailAddress={formData.detailAddress}
          addressError={errors.address}
          detailAddressError={errors.detailAddress}
          isOpen={modalOpen}
          {...{ toggleModal, modalType, handleSetFormData }}
        />

        <CreditForm
          value={formData.creditCardNum}
          error={errors.creditCardNum}
          isOpen={modalOpen}
          {...{ toggleModal, modalType, handleSetFormData }}
        />

        <BirthForm
          value={formData.dateOfBirth}
          error={errors.dateOfBirth}
          {...{ handleSetFormData }}
        />

        <Button type="submit" value="회원가입" marginTop="10px" />

        <Modal isOpen={modalOpen} toggleModal={toggleModal} modalType={modalType}>
          {modalType === "success" && <SignupModal />}
        </Modal>
      </Form>
    </Wrapper>
  );
};

export default SignUp;
