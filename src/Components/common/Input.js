import React from "react";
import styled, { css } from "styled-components";

const Input = ({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  icon = null,
  error = false,
  errorMessage = null,
  successMessage = null,
  width,
}) => {
  return (
    <Wrapper width={width}>
      <InputWrapper error={error}>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        {icon}
      </InputWrapper>
      {error && errorMessage && <Message status="error">{errorMessage}</Message>}
      {!error && successMessage && <Message status="success">{successMessage}</Message>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 10px 0;
`;

const InputWrapper = styled.div`
  position: relative;

  input {
    width: ${({ width }) => width || "100%"};
    height: 40px;
    padding-left: 8px;
    font-size: 16px;
    border: 1px solid ${({ theme }) => theme.color.borderline};
    border-radius: 4px;

    &::placeholder {
      color: ${({ theme }) => theme.color.fontGray};
    }
    &:focus {
      border-color: ${({ theme }) => theme.color.green};
    }

    ${({ error }) =>
      error &&
      css`
        background-color: ${({ theme }) => theme.color.lightred};
        border-color: ${({ theme }) => theme.color.red};
        &:focus {
          border-color: ${({ theme }) => theme.color.red};
        }
      `}
  }

  svg {
    position: absolute;
    right: 16px;
    width: 16px;
    height: 40px;
  }
`;

const Message = styled.p`
  margin-top: 8px;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme, status }) => (status === "error" ? theme.color.red : theme.color.green)};
`;

export default Input;
