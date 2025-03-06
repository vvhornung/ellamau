import styled from "styled-components";

export const SummaryContainer = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.223);
  border-radius: 0.2rem;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.107);
  padding: 2rem 3rem;
  display: flex;
  flex-direction: column;
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
  background: ${({ theme }) => theme.colors.logo};
  font-family: "Public Sans", sans-serif;
  color: #fff;
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 4px;
  font-weight: 400;
  font-size: 1rem;
  margin-top: 1rem;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;
