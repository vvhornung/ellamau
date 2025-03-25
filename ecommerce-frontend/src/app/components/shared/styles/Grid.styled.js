"use client";

import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$columns || 4}, 1fr);
  gap: ${(props) => props.$gap || "1rem"};
  width: ${({ width }) => width || "100%"};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.4rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }


`;

export default Grid