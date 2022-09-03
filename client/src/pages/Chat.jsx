import {Helmet} from "react-helmet";
import React, {useEffect, useState, useRef} from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import {allUser, baseUrl} from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import {ToastContainer, toast} from "react-toastify";
import {io} from "socket.io-client";

function Chat() {
    const socket = useRef();
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [isContactsLoaded, setIsContactsloaded] = useState(false);
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        draggable: true,
        theme: "dark",
    };

    useEffect(() => {
        const checkAuthenticate = async () => {
            const user = await JSON.parse(localStorage.getItem("chat-app-user"));
            if (!user) {
                navigate("/login");
            } else if (user?.isAvatarImageSet === false) {
                navigate("/setAvatar");
            } else {
                setCurrentUser(user);
            }
        };
        checkAuthenticate();
    }, []);

    useEffect(() => {
        if (currentUser) {
            socket.current = io(baseUrl);
            socket.current.emit("add-user", currentUser._id);
        }
    }, [currentUser]);

    useEffect(() => {
        const getAllContact = async () => {
            try {
                const data = await axios.get(`${allUser}/${currentUser._id}`);

                setContacts(data.data.users);
                setIsContactsloaded(true);
            } catch (err) {
                if (err.message === "Network Error") {
                    toast.error("Network Error", toastOptions);

                    return;
                }
                toast.error("Something Went Wrong", toastOptions);
            }
        };

        if (currentUser) {
            getAllContact();
        }
    }, [currentUser]);

    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    };

    return (
        <>
            <Container>
                <Helmet>
                    <title>Chat App | Chat</title>
                </Helmet>
                <div className="container">
                    {isContactsLoaded && <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />}
                    {isContactsLoaded && currentChat === undefined ? <Welcome currentUser={currentUser} /> : <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />}
                </div>
            </Container>
            <ToastContainer />
        </>
    );
}

const Container = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;
    .container {
        height: 85vh;
        width: 85%;
        background-color: #00000076;
        display: grid;
        grid-template-columns: 1fr 3fr;
        @media screen and(min-width: 720px) and (max-width: 1080px) {
            grid-template-columns: 1.5fr 2.5fr;
        }
        @media (max-width: 992px) {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 1fr;
        }
    }
`;

export default Chat;
