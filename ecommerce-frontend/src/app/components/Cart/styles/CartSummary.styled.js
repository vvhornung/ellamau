import styled from "styled-components";

export const SummaryContainer = styled.div`
  background: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: ${(props) => (props.$large ? "1.2rem" : "1rem")};
  font-weight: ${(props) => (props.$bold ? "bold" : "normal")};
  padding-bottom: ${(props) => (props.$withBorder ? "1rem" : "0")};
  border-bottom: ${(props) => (props.$withBorder ? "1px solid #ddd" : "none")};
`;

export const CheckoutButton = styled.button`
  background: #000;
  color: #fff;
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  font-size: 1rem;
  margin-top: 1rem;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #333;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;
