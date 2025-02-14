"use client";

import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$columns || 4}, 1fr);
  gap: ${(props) => props.$gap || "1rem"};

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;
