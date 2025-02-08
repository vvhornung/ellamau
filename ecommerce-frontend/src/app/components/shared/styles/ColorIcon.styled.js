'use client'
import styled from "styled-components";

export const ColorIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid black;
    background-color: ${({ $color }) => $color || "black"};

    
`;
