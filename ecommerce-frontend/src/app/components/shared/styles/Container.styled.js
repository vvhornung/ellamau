"use client";

import styled from "styled-components";

export const Container = styled.div`
  /* Dynamically set the width of the container based on the width prop */
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "auto%"};
  margin: 0 auto;
  padding: 12px 20px;
  display: flex;
  flex-direction: column;
  align-items: ${({ $align }) => $align || "center"};
  background-color: ${({ $bg }) => $bg || "transparent"};

  /* Use overflow-x: auto to show scrollbar only when necessary */
  overflow-x: ${({ $scroll }) => ($scroll ? "auto" : "hidden")};
  overflow: ${({ $overflow }) => $overflow || "auto"};

  scrollbar-color: #ccc #f1f1f1;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ $bg }) => $bg || "#ccc"};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${({ $bg }) => $bg || "#f1f1f1"};
  }
`;
