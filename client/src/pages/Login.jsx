import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import Logo from "../assets/img/logo.svg";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {login} from "../utils/APIRoutes";
import {Helmet} from "react-helmet";

function Login() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        password: "",
    });
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        draggable: true,
        theme: "dark",
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const {username, password} = values;

        try {
            const {data} = await axios.post(login, {
                username,
                password,
            });

            localStorage.setItem("chat-app-user", JSON.stringify(data.user));
            if (data.user.isAvatarImageSet) {
                return navigate("/");
            }

            return navigate("/setAvatar");
        } catch (err) {
            if (err.message === "Network Error") {
                toast.error("Network Error", toastOptions);

                return;
            }
            toast.error(err.response.data.msg, toastOptions);
        }
    };

    const handleChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value.trim()});
    };

    useEffect(() => {
        const checkAuthenticate = async () => {
            const user = await JSON.parse(localStorage.getItem("chat-app-user"));
            if (user && user?.isAvatarImageSet) {
                navigate("/");
            } else if (user?.isAvatarImageSet === false) {
                navigate("/setAvatar");
            }
        };
        checkAuthenticate();
    }, []);

    return (
        <>
            <FormContainer>
                <Helmet>
                    <title>Chat App | Login</title>
                </Helmet>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="brand">
                        <img src={Logo} alt="Logo" />
                        <h1>Snappy</h1>
                    </div>
                    <input type="text" placeholder="Username" name="username" onChange={(e) => handleChange(e)} autoFocus required />
                    <input type="password" placeholder="Password" name="password" onChange={(e) => handleChange(e)} required />
                    <button type="submit">Login</button>
                    <span>
                        Dont have an account ? <Link to={"/register"}>Register</Link>
                    </span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    );
}
const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;
    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img {
            height: 5rem;
        }
        h1 {
            color: white;
            text-transform: uppercase;
        }
    }
    form {
        display: flex;
        flex-direction: column;
        min-width: 30%;
        gap: 1rem;
        background-color: #00000076;
        border-radius: 2rem;
        padding: 2rem 3rem;
        input {
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid #4e0eff;
            border-radius: 0.4rem;
            color: white;
            width: 100%;
            font-size: 1rem;

            transition: 0.3s ease-in-out;
            &:focus {
                border: 0.1rem solid #bf5eff;
                outline: none;
            }
        }
        button {
            background-color: #bf5eff;
            color: white;
            padding: 1rem 2rem;
            border: none;
            font-weight: bold;
            border-radius: 0.4rem;
            cursor: pointer;
            font-size: 1rem;
            text-transform: uppercase;
            transition: 0.5s ease-in-out;
            &:hover {
                background-color: #4e0eff;
            }
        }
        span {
            color: white;
            a {
                color: #4e0eff;
                font-weight: bold;
                text-decoration: none;
            }
        }
        @media (max-width: 992px) {
            width: 100%;
        }

        /* @media (max-width: 992px) {
            width: 50%;
        } */
    }
    @media (max-width: 992px) {
        padding: 0 1rem;
    }
`;

export default Login;
