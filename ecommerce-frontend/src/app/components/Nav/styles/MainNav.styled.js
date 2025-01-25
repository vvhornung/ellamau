import styled from 'styled-components';

export const StyledMainNav = styled.nav`

  width: 70%;

  ul {
    list-style: none;
    display: flex;
    justify-content: space-around;
    

  }

  li {
    a {
      color: #333;
      text-decoration: none;
      text-transform: lowercase;
      font-weight: 500;
      font-size: 16px;
      letter-spacing: .16em;
      color: black;
      &:hover {
        color: ${ ({theme}) => theme.colors.primary}};
      }
    }

`;
