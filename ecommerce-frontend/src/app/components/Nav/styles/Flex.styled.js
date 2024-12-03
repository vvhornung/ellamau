import styled from "styled-components";


export const Flex = styled.div`
  display: flex;
  gap: ${({ gap }) => gap || "1rem"};
  justify-content: ${({ justify }) => justify || "center"};
  align-items: center;
  padding: 10px 20px;
`;