import React, { Component } from "react";
import styled, { css } from "styled-components";

class Button extends Component {
  render() {
    const { value, width, marginTop, onClick } = this.props;
    return (
      <StyledButton type="button" width={width} marginTop={marginTop} onClick={onClick}>
        {value}
      </StyledButton>
    );
  }
}

const StyledButton = styled.button`
  ${({ theme }) => theme.flexSet("center", "center")}
  width: ${({ width }) => width || "100%"};
  height: 40px;
  padding: 0 15px;
  margin-top: ${({ marginTop }) => marginTop || "0"};
  border-radius: 5px;

  background: ${({ theme }) => theme.color.button};

  color: ${({ theme }) => theme.color.fontWhite};
  font-size: 1rem;
  font-weight: 600;

  ${({ theme }) =>
    css`
      &:hover {
        background: ${theme.color.buttonHover};
      }
    `}
`;

export default Button;
