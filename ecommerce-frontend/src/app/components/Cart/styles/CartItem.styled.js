import styled from "styled-components";

export const CartItemContainer = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  
  border-bottom: 1px solid #eaeaea;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

export const CartTitle = styled.h1`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 1rem;
`;

export const ProductInfo = styled.div`
  display: flex;
  align-items: start;
  gap: 1rem;
  flex: 2;

`;

export const ProductImage = styled.div`

  position: relative;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  overflow: hidden;
 
`;

export const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProductName = styled.h4`
  font-size: 15px;
  font-weight: 300;
  color: rgba(0, 0, 0, 0.422);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

export const ProductVariant = styled.p`
  font-size: 0.875rem;
  color: #666;
  margin: 0 0 0.5rem 0;
`;

export const ProductPrice = styled.p`
  font-weight: 600;
  margin: 0;
`;

export const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: 1.2rem;

  button.qty-selector {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 1px solid #ddd;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;

    &:hover {
      background: #f5f5f5;
    }
  }

  span {
    padding: 0 0.5rem;
  }
`;

export const RemoveButton = styled.button`
  border: none;
  color: black;
  background-color: transparent;
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
    opacity: 0.6;
  }




  &:hover {
    text-decoration: underline;

    svg{
      fill: red;
    }
  }


`;

  export const EllamauName = styled.h1`
    font-size: 20px;
    font-weight: 400;
    margin: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
  `;
