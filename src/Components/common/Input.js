import React from "react";
import styled, { css } from "styled-components";

const Input = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  error = false,
  errorMessage = null,
  successMessage = null,
  width,
}) => {
  return (
    <Wrapper width={width} error={error}>
      <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} />
      {error && errorMessage && <p className="error-message">{errorMessage}</p>}
      {!error && successMessage && <p className="sucess-message">{successMessage}</p>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
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
      border-color: ${({ theme }) => theme.color.fontBlack};
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

  p {
    margin-top: 8px;
    font-size: 16px;
    font-weight: 600;
  }

  .error-message {
    color: ${({ theme }) => theme.color.red};
  }

  .sucess-message {
    color: ${({ theme }) => theme.color.blue};
  }
`;

export default Input;
