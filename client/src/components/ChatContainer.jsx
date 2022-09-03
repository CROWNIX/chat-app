import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import axios from "axios";
import {sendMessage, getAllMessage} from "../utils/APIRoutes";
import {toast} from "react-toastify";
import {useRef} from "react";
import {v4 as uuidv4} from "uuid";

function ChatContainer({currentChat, currentUser, socket}) {
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const scrollRef = useRef();
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        draggable: true,
        theme: "dark",
    };

    useEffect(() => {
        if (currentChat) {
            const fetchAllMessage = async () => {
                try {
                    const response = await axios.get(`${getAllMessage}/${currentUser._id}/${currentChat._id}`);

                    setMessages(response.data.projectMessages);
                } catch (err) {
                    if (err.message === "Network Error") {
                        toast.error("Network Error", toastOptions);

                        return;
                    }
                    toast.error("Something Went Wrong", toastOptions);
                }
            };

            fetchAllMessage();
        }
    }, [currentChat]);

    const handleSendMsg = async (msg) => {
        try {
            await axios.post(sendMessage, {
                from: currentUser._id,
                to: currentChat._id,
                message: msg,
            });

            socket.current.emit("send-msg", {
                to: currentChat._id,
                from: currentUser._id,
                message: msg,
            });

            const msgs = [...messages];
            msgs.push({fromSelf: true, message: msg});
            setMessages(msgs);
        } catch (err) {
            if (err.message === "Network Error") {
                toast.error("Network Error", toastOptions);

                return;
            }
            toast.error("Something Went Wrong", toastOptions);
        }
    };

    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-receive", (msg) => {
                setArrivalMessage({fromSelf: false, message: msg});
            });
        }
    }, []);

    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behaviour: "smooth"});
    }, [messages]);

    return (
        <>
            {currentChat && (
                <Container>
                    <div className="chat-header">
                        <div className="user-details">
                            <div className="avatar">
                                <img src={currentChat.avatarImage} alt="avatar" />
                            </div>
                            <div className="username">
                                <h3>{currentChat.username}</h3>
                            </div>
                        </div>
                        <Logout />
                    </div>
                    <div className="chat-messages">
                        {messages.length !== 0 &&
                            messages.map((message, index) => {
                                return (
                                    <div ref={scrollRef} key={index}>
                                        <div className={`message ${message.fromSelf ? "sended" : "received"}`}>
                                            <div className="content">
                                                <p>{message.message}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                    <ChatInput handleSendMsg={handleSendMsg} />
                </Container>
            )}
        </>
    );
}

const Container = styled.div`
    padding: 1rem 0.5rem;
    display: grid;
    grid-template-rows: 10% 78% 12%;
    gap: 0.1rem;
    overflow: hidden;
    @media screen and(min-width: 720px) and (max-width: 1080px) {
        grid-template-rows: 15% 70% 15%;
    }
    .chat-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding: 0.2rem;
        .user-details {
            display: flex;
            align-items: center;
            gap: 1rem;
            .avatar {
                img {
                    height: 3rem;
                }
            }
            .username {
                color: white;
            }
        }
    }
    .chat-messages {
        padding: 1rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow: auto;
        .message {
            display: flex;
            align-items: center;
            .content {
                max-width: 40%;
                overflow-wrap: break-word;
                padding: 1rem;
                font-size: 1.1rem;
                border-radius: 1rem;
                color: #d1d1d1;
                @media (max-width: 992px) {
                    padding: 0.8rem;
                }
            }
        }
        .sended {
            justify-content: flex-end;
            .content {
                background-color: #4f04ff21;
            }
        }
        .received {
            justify-content: flex-start;
            .content {
                background-color: #9900ff20;
            }
        }
    }
`;

export default ChatContainer;
