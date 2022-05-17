import styled from "styled-components";

export const ContentSelect = styled.div`
    display:flex;
    align-items: center;
`;

export const ShowText = styled.div`
    font-size:12px;
    margin-right: 5px;
`

export const Select = styled.select`
width: 55px;
height: 32px;
background: transparent;
border-bottom: 1px solid grey !important;
color: gray;
padding-left: 5px;
font-size: 12px;
border: none;
margin-left: 10px;
margin-right: 10px;
cursor: pointer

option {
  color: black;
  background: white;
  display: flex;
  white-space: pre;
  min-height: 20px;
  padding: 0px 2px 1px;
}
`;