import React, {useState} from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import {IoMdSend} from "react-icons/io";
import {BsEmojiSmileFill} from "react-icons/bs";

function ChatInput({handleSendMsg}) {
    const [isTyping, setIsTyping] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState("");

    const handleEmojiPickerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    const handleTyping = (e) => {
        setMsg(e.target.value);
        if (e.target.value.trim() === "") {
            return setIsTyping(false);
        }

        return setIsTyping(true);
    };

    const handleEmojiClick = (e, emoji) => {
        let message = msg;
        message += emoji.emoji;
        setMsg(message);
    };

    const sendChat = (e) => {
        e.preventDefault();
        if (msg.length > 0) {
            handleSendMsg(msg);
            setMsg("");
        }
    };

    return (
        <Container>
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
                    {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} className="emoji-picker-react" />}
                </div>
            </div>
            <form className="input-container" onSubmit={(e) => sendChat(e)}>
                <input type="text" placeholder="Type your message here" onChange={handleTyping} value={msg} />
                <button type="submit" className={isTyping ? "" : "hide-button"}>
                    <IoMdSend />
                </button>
            </form>
        </Container>
    );
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 0.1fr 2.5fr;
    align-items: center;
    padding: 0.3rem;
    padding-bottom: 0.3rem;
    .button-container {
        display: flex;
        align-items: center;
        color: white;
        gap: 1rem;
        .emoji {
            position: relative;
            svg {
                font-size: 1.5rem;
                color: #ffff00c7;
                cursor: pointer;
            }
            .emoji-picker-react {
                position: absolute;
                background-color: #080420;
                box-shadow: 0 5px 10px #9a86f3;
                border-color: #bf5eff;
                top: -350px;
                .emoji-scroll-wrapper::-webkit-scrollbar {
                    background-color: #080420;
                    width: 5px;
                    &-thumb {
                        background-color: #bf5eff;
                    }
                }
                .emoji-categories {
                    button {
                        filter: contrast(0);
                    }
                }
                .emoji-search {
                    background-color: transparent;
                    border-color: #bf5eff;
                }
                .emoji-group::before {
                    background-color: #080420;
                }
            }
        }
    }
    .input-container {
        width: 100%;
        border-radius: 2rem;
        display: flex;
        align-items: center;
        gap: 2rem;
        background-color: #ffffff34;
        input {
            padding: 0.5rem 1rem;
            width: 90%;
            height: 60%;
            background-color: transparent;
            color: white;
            border: none;
            font-size: 1.2rem;
            &::selection {
                background-color: #9186f3;
            }
            &:focus {
                outline: none;
            }
        }
        button {
            padding: 0.3rem 1rem;
            border-radius: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #bf5eff;
            border: none;
            cursor: pointer;
            transition: 0.3s ease-in-out;
            svg {
                font-size: 1.5rem;
                color: white;
            }
            &:hover {
                background-color: #4e0eff;
            }
        }
        .hide-button {
            display: none;
        }
    }
`;

export default ChatInput;
