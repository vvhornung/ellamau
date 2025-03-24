'use client'

import styled from "styled-components";

export const StyledUserNav = styled.div`
  background-color: #f2b513;
  justify-content: flex-end;
  width: 100%;

  svg {
    width: 30px;
    height: 30px;
  }

  svg:hover {
    cursor: pointer;
    transition: 0.2s ease-in-out;
    fill: white;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
  
`;
