import styled, { css } from "styled-components";
import checkIcon from "Assets/svg/check.svg";

const Wrapper = styled.div`
  ${({ theme }) => theme.flexSet("center", "center", "column")};
  width: 100%;
  height: calc(100% - 72px);
`;

const Form = styled.form`
  width: 600px;
  padding: 40px;
  border: 1px solid ${({ theme }) => theme.color.borderline};

  h4 {
    font-size: 30px;
    margin-bottom: 20px;
    font-weight: 500;
    text-align: center;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 40px 0;
  }
`;

const EmailWrapper = styled.div`
  ${({ theme }) => theme.flexSet("space-between")};
`;

const PasswordPolicy = styled.div`
  ${({ theme }) => theme.flexSet("space-around")};

  > div {
    color: ${({ theme }) => theme.color.borderline};
    text-align: center;
    font-size: 15px;
    &::before {
      display: inline-block;
      background: url(${checkIcon});
      content: "";
      width: 20px;
      height: 16px;
    }
  }
  .password-pwNum {
    ${(props) =>
      props.passwordError.pwNum &&
      css`
        color: ${({ theme }) => theme.color.green};
        font-weight: 600;
      `};
  }
  .password-eng {
    ${(props) =>
      props.passwordError.eng &&
      css`
        color: ${({ theme }) => theme.color.green};
        font-weight: 600;
      `};
  }
  .password-spe {
    ${(props) =>
      props.passwordError.spe &&
      css`
        color: ${({ theme }) => theme.color.green};
        font-weight: 600;
      `};
  }
  .password-digit {
    ${(props) =>
      props.passwordError.digit &&
      css`
        color: ${({ theme }) => theme.color.green};
        font-weight: 600;
      `};
  }
`;

const AddressWrapper = styled.div`
  position: relative;

  span {
    position: absolute;
    top: 12.5px;
    right: 2px;
    color: ${({ theme }) => theme.color.green};
    font-size: 13px;
    font-weight: 600;
    padding: 10px 50px 13px 0;
    cursor: pointer;
    background-color: white;
  }
  svg {
    z-index: 1;
  }
`;

const CreditCardWrapper = styled.div`
  position: relative;

  span {
    position: absolute;
    top: 12.5px;
    right: 2px;
    color: ${({ theme }) => theme.color.green};
    font-size: 13px;
    font-weight: 600;
    padding: 10px 50px 13px 0;
    cursor: pointer;
    background-color: white;
  }
  svg {
    z-index: 1;
  }
`;

export { Wrapper, Form, EmailWrapper, PasswordPolicy, AddressWrapper, CreditCardWrapper };
