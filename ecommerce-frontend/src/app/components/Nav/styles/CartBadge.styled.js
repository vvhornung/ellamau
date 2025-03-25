'use client'

import styled from "styled-components";

export const CartIconWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const CartBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: black;
  font-size: 10px;
  font-weight: bold;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  padding: 2px;

  &.mobile{
    background-color: black;
    color: white;
  }
`;
