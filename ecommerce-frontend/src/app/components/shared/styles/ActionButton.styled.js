import styled, { css } from "styled-components";

// Base styles
const baseStyles = css`
  color: ${({ primarycolor }) => primarycolor || "white"};
  border: 2px solid ${({ primarycolor }) => primarycolor || "white"};
  padding: 0.5rem;
  font-size: 10px;
  cursor: pointer;
  transition: 0.2s linear all;
  background-color: transparent;

  &:hover {
    background-color: ${({ primarycolor }) => primarycolor || "white"};
    color: ${({ secondarycolor }) => secondarycolor || "black"};
  }
`;

// Underline styles
const underlineStyles = css`
  border: none;
  position: relative;
  padding: 0.5rem 0;
  background-color: transparent;
  color: ${({ primarycolor }) => primarycolor || "white"};

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 50%;
    height: 2px;
    background-color: ${({ primarycolor }) => primarycolor || "white"};
    transition: width 0.5s linear;
  }

  &:hover:after {
    width: 120%;
  }

  &:hover {
    background-color: transparent;
    color: ${({ primarycolor }) => primarycolor || "white"};
  }
`;

export const ActionButton = styled.button`
  ${({ variant }) => (variant === "underline" ? underlineStyles : baseStyles)};
`;

export default ActionButton;
