import styled from "styled-components";

export const PromoCard = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    color: ${({ textColor }) => textColor || 'white'};
    padding: 20px;


  h2 {
    font-family: "Cinzel Decorative", serif;
    font-size: 2.5rem;
    font-weight: 400;
    margin-bottom: 10px;
    text-transform: lowercase;
  }

  p {
    font-family: "Public Sans", sans-serif;
    font-weight: 200;
    font-size: 1rem;
    margin-bottom: 20px;
  }

  button {
    font-size: 1rem;
    font-family: "Public Sans", sans-serif;
    font-weight: bold;
    text-transform: uppercase;
    position: relative;
    cursor: pointer;
  }

`;