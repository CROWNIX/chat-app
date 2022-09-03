import React from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import {BsBoxArrowInRight} from "react-icons/bs";

function Logout() {
    const navigate = useNavigate();
    const handleLogout = async () => {
        localStorage.clear();
        navigate("/login");
    };
    return (
        <Button onClick={handleLogout}>
            <BsBoxArrowInRight />
        </Button>
    );
}

const Button = styled.button`
    /* display: flex;
    justify-content: center;
    align-items: center; */
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: #bf5eff;
    border: none;
    cursor: pointer;
    svg {
        font-size: 1rem;
        color: #ebe7ff;
    }
    transition: 0.3s ease-in-out;
    &:hover {
        background-color: #4e0eff;
    }
`;

export default Logout;
