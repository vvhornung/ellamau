"use client";

import { styled } from "styled-components";

// Base styles
 const ActionButton = styled.button`
  color: white;
  background-color: black;
  padding: 0.75rem 1.5rem;
  font-size: 10px;
  cursor: pointer;
  transition: 0.2s linear all;
  border: none;

  &.rounded {
    border-radius: 4px;
  }

  &.secondary {
    background-color: white;
    color: black;
  }

  &.brand {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }

  &.outline {
    background-color: transparent;
    border: 1px solid;
    border-color: black;
    color: black;

    &.secondary {
      border-color: white;
      color: white;
    }

    &.brand {
      border-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.primary};
    }

    &:hover {
      background-color: black;
      color: white;

      &.secondary {
        background-color: white;
        color: black;
      }

      &.brand {
        background-color: ${({ theme }) => theme.colors.primary};
        color: white;
      }
    }
  }
`;





export default ActionButton;