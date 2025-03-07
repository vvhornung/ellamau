"use client";

import styled from "styled-components";

export const FilterOption = styled.div`
  position: relative;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background: #ffffff;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;

  &:hover {
    background: #f9f9f9;
  }

  &.active {
    background: #f5f5f5;
    border-color: #c0c0c0;
  }
`;

export const FilterDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: max-content;
  min-width: 150px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 2;
  margin-top: 0.5rem;
  max-height: 300px;
  overflow-y: auto;
  display: ${(props) => (props.$isOpen ? "block" : "none")};
`;

export const FilterItem = styled.div`
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #f5f5f5;
  }

  &.selected {
    background: #f0f0f0;
    font-weight: 500;
  }
`;

export const FilterBadge = styled.span`
  background: #333;
  color: white;
  font-size: 0.7rem;
  padding: 0.1rem 0.4rem;
  border-radius: 12px;
  margin-left: 0.3rem;
`;
