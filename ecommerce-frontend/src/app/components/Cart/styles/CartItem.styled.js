import { styled, css } from "styled-components";

// Add OutOfStockBanner styled component
export const OutOfStockBannerContainer = styled.div`
  background-color: #ffebee;
  border: 1px solid #ef5350;
  border-radius: 4px;
  padding: 12px 16px;
  margin: 10px 0;
  position: relative;
  width: 100%;
`;

export const BannerTitle = styled.h4`
  margin: 0 0 8px 0;
  color: #d32f2f;
  font-size: 16px;
`;

export const BannerText = styled.p`
  margin: 0 0 8px 0;
  font-size: 14px;
`;

export const BannerList = styled.ul`
  margin: 0;
  padding-left: 20px;
  font-size: 14px;
`;

export const BannerDismissButton = styled.button`
  position: absolute;
  right: 8px;
  top: 8px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #ef5350;

  &:hover {
    color: #b71c1c;
  }
`;

export const CartItemContainer = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;

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
  gap: 1rem;
`;

export const ProductName = styled.h4`
  font-size: 15px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.422);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

export const ProductVariant = styled.p`
  font-size: 0.875rem;
  color: #666;

  span {
    color: black;
    text-transform: capitalize;
    font-weight: bold;
  }
`;

export const ProductPrice = styled.p`
  font-weight: 600;
  margin: 0;
`;

export const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 2rem;
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

    svg {
      fill: red;
    }
  }
`;

// Define style fragments using css helper
const inStockStyles = css`
  background-color: #2ecc71;
  border-color: rgb(23, 139, 71);
  color: "#ffffff";
`;

const lowStockStyles = css`
  background-color: #f39c12;
  border-color: #e67e22;
  color: "#ffffff";
`;

const loadingStockStyles = css`
  background-color: white;
  border-color: black;
  color: black;
`;

// Now use these in StockStatus component
export const StockStatus = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 2px solid;
  border-radius: 4px;
  font-weight: 600;
  font-family: "Public Sans", sans-serif;
  padding: 0.2rem 0.5rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  /* Use style fragments based on status prop */
  ${({ $status }) =>
    $status === "loadingStock"
      ? loadingStockStyles
      : $status === "lowStock"
      ? lowStockStyles
      : inStockStyles}
`;

export const EllamauName = styled.h1`
  font-size: 20px;
  font-weight: 400;
  margin: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;
