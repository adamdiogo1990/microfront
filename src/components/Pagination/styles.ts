import styled from "styled-components";

export const ContentPagination = styled.div`
    display: flex;
`;

export const ContainerButton = styled.div`
    display:flex;
    width:32px;
    height:32px;
    font-weight:bold;
    font-size:12px;
    background-color: #FFF;
    ${props => props.theme.active && `
        background-color: #1A75FF;
        color: #FFF
    `};
    border-radius:5px;
    align-items: center;
    justify-content: center;
    margin-right:5px;
`