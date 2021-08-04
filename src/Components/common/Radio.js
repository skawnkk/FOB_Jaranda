import React from "react";
import styled from "styled-components";

const Radio = ({ name, value, onChange, data = [], error = false, errorMessage = null }) => {
  return (
    <Wrapper error={error}>
      <div>
        {data.map((item, idx) => (
          <label key={idx}>
            <input
              type="radio"
              name={name}
              checked={value === item.value}
              onChange={() => onChange(item.value)}
            />
            <span>{item.label}</span>
          </label>
        ))}
      </div>
      {error && errorMessage && <p className="error-message">{errorMessage}</p>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  > div {
    ${({ theme }) => theme.flexSet("flex-start", "center")}

    label {
      ${({ theme }) => theme.flexSet("center", "center")}
      padding: 10px 10px 10px 0;

      input[type="radio"] {
        position: relative;
        width: 16px;
        height: 16px;
        margin-right: 6px;
        border: 1px solid ${({ theme, error }) => (error ? theme.color.red : theme.color.green)};
        border-radius: 50%;
        -webkit-appearance: none;
      }

      input[type="radio"]:checked {
        background-color: ${({ theme }) => theme.color.green};
      }
      input[type="radio"]:checked:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        width: 8px;
        height: 8px;
        margin: auto;

        background-color: ${({ theme }) => theme.color.fontWhite};
        border-radius: 50%;
      }

      span {
        color: ${({ theme }) => theme.color.fontGray};
      }
    }
  }

  p {
    margin-top: 8px;
    font-size: 16px;
    font-weight: 600;

    &.error-message {
      color: ${({ theme }) => theme.color.red};
    }
  }
`;

export default Radio;
