"use client";

import styled from "styled-components";

export const Flex = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction || "row"};
  gap: ${({ $gap }) => $gap || "1rem"};
  justify-content: ${({ $justify }) => $justify || "center"};
  align-items: ${({ $align }) => $align || "center"};
  width: ${({ width }) => width || "100%"};
  flex-wrap: ${({ $wrap }) => $wrap ? "wrap" : "nowrap"};
`;
