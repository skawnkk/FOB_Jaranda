import React, { useRef, useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import Button from "./common/Button";
import Input from "./common/Input";

const CreditModal = () => {
  const inputRef = useRef([]);

  const [firstCardNum, setFirstCardNum] = useState("");
  const [secondCardNum, setSecondCardNum] = useState("");
  const [thirdCardNum, setThirdCardNum] = useState("");
  const [fourthCardNum, setFourthCardNum] = useState("");

  const onlyNumber = (value) => {
    return value.replace(/[^0-9]/g, "");
  };

  const onChangeFirstCardNum = useCallback((e) => {
    setFirstCardNum(onlyNumber(e.target.value));
  }, []);

  const onChangeSecondCardNum = useCallback((e) => {
    setSecondCardNum(onlyNumber(e.target.value));
  }, []);

  const onChangeThirdCardNum = useCallback((e) => {
    setThirdCardNum(onlyNumber(e.target.value));
  }, []);

  const onChangeFourthCardNum = useCallback((e) => {
    setFourthCardNum(onlyNumber(e.target.value));
  }, []);

  useEffect(() => {
    const focusIndex = inputRef.current.reduce((acc, cur, idx) => {
      if (cur.value !== 4) return (acc = idx);
      return acc;
    }, 0);
    console.log(focusIndex);
    // inputRef.current[focusIndex].focus();
  }, [firstCardNum]);

  return (
    <Wrapper>
      <div className="card-warpper">
        <Input
          ref={(r) => (inputRef.current[0] = r)}
          name="email"
          value={firstCardNum}
          onChange={onChangeFirstCardNum}
          placeholder="****"
          width="20%"
          maxLength={4}
          numberOnly
        />
        <Input
          ref={(r) => (inputRef.current[1] = r)}
          name="email"
          value={secondCardNum}
          onChange={onChangeSecondCardNum}
          placeholder="****"
          width="20%"
          maxLength={4}
          numberOnly
        />
        <Input
          ref={(r) => (inputRef.current[2] = r)}
          name="email"
          value={thirdCardNum}
          onChange={onChangeThirdCardNum}
          placeholder="****"
          width="20%"
          maxLength={4}
          numberOnly
        />
        <Input
          ref={(r) => (inputRef.current[3] = r)}
          name="email"
          value={fourthCardNum}
          onChange={onChangeFourthCardNum}
          placeholder="****"
          width="20%"
          maxLength={4}
          numberOnly
        />
      </div>
      <Button type="submit" value="카드번호 입력완료" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${({ theme }) => theme.flexSet("center", "center", "column")}
  width: 500px;
  height: 300px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.color.fontWhite};
  border: 1px solid ${({ theme }) => theme.color.green};

  .card-warpper {
    ${({ theme }) => theme.flexSet("center", "center", "row")}
  }
`;

export default CreditModal;
