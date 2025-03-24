import styled from "styled-components";

export const StyledSearchNav = styled.div`
    width: 100%;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        display: none;
    }

    `;