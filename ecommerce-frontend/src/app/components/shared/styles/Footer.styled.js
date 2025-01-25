import styled from 'styled-components';

export const Footer = styled.footer`
  background-color: ${({ theme }) => theme.colors.footer};
  padding: 2rem 0;
  display: flex;
  justify-content: space-between;
  flex-direction: row;

  button {
    border: 2px solid #000;
    padding: 10px 20px;
    font-size: 0.9rem;
    text-transform: uppercase;
    cursor: pointer;
  }

  h3 {
    font-size: 1rem;
    font-weight: bold;
    text-transform: uppercase;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin: 0.5rem 0;
    a {
      font-size: 14.4px;
      color: #555;
    }
  }
`;
