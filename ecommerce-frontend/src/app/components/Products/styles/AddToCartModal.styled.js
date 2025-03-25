import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 1.5rem;
  max-width: 500px;
  width: 90%;
  animation: ${fadeIn} 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

export const ModalTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ModalBody = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ProductName = styled.p`
  margin: 0;
  font-weight: bold;
`;

export const ProductVariant = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #666;
`;

export const ProductPrice = styled.p`
  margin: 0;
  font-weight: bold;
`;

export const ModalButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  width: 100%;
`;

export const ModalButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;

  &.primary {
    background: #000;
    color: #fff;
  }

  &.secondary {
    background: transparent;
    border: 1px solid #000;
    color: #000;
    transition: background 0.3s, color 0.3s;
  }

  &.secondary:hover {
    background: #000;
    color: #fff;
  }
`;

export const ImageContainer = styled.div`
  width: 80px;
  height: 100px;
  position: relative;
`;
