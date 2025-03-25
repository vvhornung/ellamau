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
   width: ${({ width }) => width || "auto"};

   &:disabled {
     background-color: #ccc;
     cursor: not-allowed;
   }

   &.xl{
      padding: 1rem 2rem;
      font-size: 18px;
      font-weight: 600;
   }

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

     &:hover {
        background-color: ${({ theme }) => theme.colors.logo};
      }
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

export const UnderlineButton = styled(ActionButton)`
  background-color: transparent;
  border: none;
  color: black;
  padding: 0;
  font-size: 12px;
  cursor: pointer;
  position: relative;

  &::after {
    position: absolute;
    bottom: 0;
    left: 50%;
    content: "";
    display: block;
    height: 2px;
    background: black;
    transition: width 0.3s, transform 0.3s;
    width: 30%; /* Start with 20% width */
    transform: translateX(-50%); /* Center the line */
  }

  &:hover::after {
    width: 100%; /* Expand to 100% on hover */
    transform: translateX(-50%); /* Keep it centered */
  }


`;






export default ActionButton;