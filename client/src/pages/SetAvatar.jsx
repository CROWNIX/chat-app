import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import loader from "../assets/img/loader.gif";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {setAvatar} from "../utils/APIRoutes";
import {Helmet} from "react-helmet";
import avatar1 from "../assets/img/avatar1.png";
import avatar2 from "../assets/img/avatar2.png";
import avatar3 from "../assets/img/avatar3.png";
import avatar4 from "../assets/img/avatar4.png";
import avatar5 from "../assets/img/avatar5.png";
import avatar6 from "../assets/img/avatar6.png";
import avatar7 from "../assets/img/avatar7.png";
import avatar8 from "../assets/img/avatar8.png";

function StAvatar() {
    const navigate = useNavigate();
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        draggable: true,
        theme: "dark",
    };
    const listAvatars = [
        {
            image: avatar1,
        },
        {
            image: avatar2,
        },
        {
            image: avatar3,
        },
        {
            image: avatar4,
        },
        {
            image: avatar5,
        },
        {
            image: avatar6,
        },
        {
            image: avatar7,
        },
        {
            image: avatar8,
        },
    ];

    useEffect(() => {
        if (!localStorage.getItem("chat-app-user")) {
            navigate("/login");
        }
    }, []);

    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error("Please select an avatar", toastOptions);
        }

        try {
            const user = await JSON.parse(localStorage.getItem("chat-app-user"));
            const {data} = await axios.post(`${setAvatar}/${user._id}`, {
                image: listAvatars[selectedAvatar].image,
            });

            if (data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem("chat-app-user", JSON.stringify(user));
                navigate("/");
            }
        } catch (error) {
            toast.error("Error setting avatar, please try again", toastOptions);
        }
    };

    return (
        <>
            <Container>
                <Helmet>
                    <title>Chat App | Set Avatar</title>
                </Helmet>
                <div className="title-container">
                    <h1>Pick an avatar as you profile picture</h1>
                </div>
                <div className="avatars">
                    {listAvatars.map((avatar, index) => {
                        return (
                            <div key={index} className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
                                <img src={avatar.image} alt="avatar" onClick={() => setSelectedAvatar(index)} />
                            </div>
                        );
                    })}
                </div>
                <button className="btn-submit" onClick={setProfilePicture}>
                    Set as profile picture
                </button>
            </Container>
            <ToastContainer />
        </>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    background-color: #131324;
    height: 100vh;
    width: 100%;
    .title-container {
        h1 {
            color: white;
            text-align: center;
            font-size: 2rem;
            @media (max-width: 576px) {
                font-size: 1.5rem;
            }
            @media (max-width: 376px) {
                font-size: 1rem;
            }
        }
    }
    .avatars {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 2rem;
        @media (max-width: 376px) {
            gap: 1rem;
        }
        .avatar {
            border: 0.4rem solid transparent;
            padding: 0.2rem;
            border-radius: 5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.3s ease-in-out;
            img {
                cursor: pointer;
                height: 6rem;
                @media (max-width: 992px) {
                    height: 4rem;
                }
                @media (max-width: 576px) {
                    height: 3rem;
                }
                @media (max-width: 376px) {
                    height: 2rem;
                }
            }
            @media (max-width: 376px) {
                padding: 0;
            }
        }
        .selected {
            border: 0.4rem solid #4e0eff;
        }
    }
    .btn-submit {
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
        @media (max-width: 576px) {
            padding: 1rem 1.5rem;
            font-size: 0.8rem;
        }
    }
`;

export default StAvatar;
