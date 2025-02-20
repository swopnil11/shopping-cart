import styled from "styled-components";

export const Wrapper = styled.aside`
    display: flex;
    justify-content: space-between;
    font-family: Arial, Helvetica, sans-seriff;
    border-bottom: 1px solid lightblue;
    padding-bottom: 20px;

    div {
        flex: 1;
    }

    .information,.button {
        display: flex;
        justify-content: space-between;
    }

    img{
        max-width: 80px;
        object-fit: cover;
        margin-left: 40px;
    }
`;