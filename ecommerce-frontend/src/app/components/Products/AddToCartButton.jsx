"use client";
import styled from "styled-components";
import ActionButton from "../shared/styles/Button.styled";



export default function AddToCartButton({ onClick, disabled }) {
  return (
    <ActionButton width={'100%'} onClick={onClick} disabled={disabled}>
      Add to Cart
    </ActionButton>
  );
}
