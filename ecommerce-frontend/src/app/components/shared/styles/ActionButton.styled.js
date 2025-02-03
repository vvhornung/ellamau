"use client";

import { styled, css } from "styled-components";

// Base styles
const baseStyles = css`
  color: ${({ $primaryColor }) => $primaryColor || "white"};
  border: 2px solid ${({ $primaryColor }) => $primaryColor || "white"};
  padding: 0.5rem;
  font-size: 10px;
  cursor: pointer;
  transition: 0.2s linear all;
  background-color: transparent;

  &:hover {
    background-color: ${({ $primaryColor }) => $primaryColor || "white"};
    color: ${({ $secondarycolor }) => $secondarycolor || "black"};
  }
`;

// Underline styles
const underlineStyles = css`
  border: none;
  position: relative;
  padding: 0.5rem 0;
  background-color: transparent;
  color: ${({ $primaryColor }) => $primaryColor || "white"};

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 50%;
    height: 2px;
    background-color: ${({ $primaryColor }) => $primaryColor || "white"};
    transition: width 0.5s linear;
  }

  &:hover:after {
    width: 120%;
  }

  &:hover {
    background-color: transparent;
    color: ${({ $primaryColor }) => $primaryColor || "white"};
  }
`;

export const ActionButton = styled.button`
  ${({ $variant }) =>
    $variant === "underline" ? underlineStyles : baseStyles};
`;

export default ActionButton;
