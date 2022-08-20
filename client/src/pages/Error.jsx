import React from "react";
import styled from "styled-components";

function Error() {
    return (
        <Container>
            <h1>404 | NOT FOUND</h1>
        </Container>
    );
}

const Container = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #00001d;
    h1 {
        color: #080750;
    }
`;

export default Error;
