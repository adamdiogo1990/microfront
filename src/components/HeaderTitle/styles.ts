import styled from "styled-components";

export const Container = styled.ul`
    position: relative;
    list-style-type: none;
    border-bottom: 1px solid #d6d6d6;
    padding-bottom: 0px;
    padding-left: 0;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;

    li{
        color: #195ab4;
        position: relative;
        display: inline;
        margin: 10px 40px 10px 0;
        cursor: pointer;
        padding: 12px 5px;
        font-size: 16px;

        h2{
            font-size: 16px;
            display: inline-flex;
            margin: 0;
            font-weight: 400;
            font-family: 'Poppins', sans-serif;
        }

        span{
            background-color: #195ab4;
            opacity: 1;
            left: 0;
            position: absolute;
            height: 1px;
            width: 100%;
            bottom: -4px;
        }
    }
`;

