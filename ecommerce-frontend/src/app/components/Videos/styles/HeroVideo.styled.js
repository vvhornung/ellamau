import styled from "styled-components";

export const StyledHeroVideo = styled.div`

  background-color: ${({ bg }) => bg || "white"};

  video {
    width: 100%;
    object-fit: cover;
    margin: 0 auto;
    overflow: hidden;
    height: 100%;
    z-index: -1;
  }
  
`;
