import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Button from "./common/Button";
import Input from "./common/Input";

const CreditModal = ({ creditCard, onSelected, toggleModal }) => {
  const inputRef = useRef([]);

  const creditCardArray = (!!creditCard && creditCard.split("-")) || "";
  const [creditCardNumber, setCreditCardNumber] = useState({
    num0: creditCardArray[0] || "",
    num1: creditCardArray[1] || "",
    num2: creditCardArray[2] || "",
    num3: creditCardArray[3] || "",
  });
  const [error, setError] = useState(false);

  const onlyNumber = (value) => {
    return value.replace(/[^0-9]/g, "");
  };

  const onChangeCreditCardNumber = (e) => {
    const { name, value } = e.target;
    setCreditCardNumber({ ...creditCardNumber, [name]: onlyNumber(value) });
  };

  const onClickButton = (e) => {
    e.preventDefault();

    const cardNumber = Object.keys(creditCardNumber).reduce(
      (acc, cur) => acc.concat(creditCardNumber[cur]),
      []
    );
    const cardNumberLength = cardNumber.join("").length;
    const cardNumberToString = cardNumber.join("-");

    if (cardNumberLength === 16) {
      setError(false);
      toggleModal(true);
      onSelected(cardNumberToString);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    const focusIndex = inputRef.current.filter((item) => item.value.length !== 4);
    focusIndex[0]?.focus();
  }, [creditCardNumber]);

  return (
    <Wrapper>
      <strong>카드 번호 입력하기</strong>
      <div className="card-wrapper">
        {Array.from({ length: 4 }, (_, i) => i).map((idx) => (
          <>
            <Input
              key={idx}
              ref={(r) => (inputRef.current[idx] = r)}
              name={`num${idx}`}
              value={creditCardNumber[`num${idx}`]}
              onChange={onChangeCreditCardNumber}
              width="20%"
              maxLength={4}
              numberOnly
            />
            <span>-</span>
          </>
        ))}
      </div>
      {error && <p>카드번호 16자리 숫자를 입력해주세요</p>}
      <Button type="submit" value="카드번호 입력완료" onClick={onClickButton} width="50%" />
    </Wrapper>
  );
};

const Wrapper = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${({ theme }) => theme.flexSet("space-evenly", "center", "column")}
  width: 500px;
  height: 300px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.color.fontWhite};
  border: 1px solid ${({ theme }) => theme.color.green};

  strong {
    font-size: 30px;
    font-weight: 500;
    color: ${({ theme }) => theme.color.button};
  }
  .card-wrapper {
    ${({ theme }) => theme.flexSet("center", "center", "row")}

    > div {
      Input {
        display: inline;
      }
    }
    span {
      margin: 0 10px;

      &:last-child {
        display: none;
      }
    }
  }

  p {
    color: ${({ theme }) => theme.color.red};
    padding: 10px;
    font-weight: 600;
    font-size: 14px;
  }

  @media (max-width: 768px) {
    width: 80%;
  }

  Button {
  }
`;

export default CreditModal;
