import React, {useState, useEffect} from "react";
import styled from "styled-components";
import logo from "../assets/img/logo.svg";

function Contacts({contacts, currentUser, changeChat}) {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(() => {
        if (currentUser) {
            setCurrentUserImage(currentUser.avatarImage);
            setCurrentUserName(currentUser.username);
        }
    }, []);

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    };

    return (
        currentUserImage &&
        currentUserName && (
            <Container>
                <div className="brand">
                    <img src={logo} alt="logo" />
                    <h3>Snappy</h3>
                </div>
                <div className="contacts">
                    {contacts.map((contact, index) => {
                        return (
                            <div className={`contact ${index === currentSelected ? "selected" : ""}`} key={index} onClick={() => changeCurrentChat(index, contact)}>
                                <div className="avatar">
                                    <img src={contact.avatarImage} alt="avatar" />
                                </div>
                                <div className="username">
                                    <h3>{contact.username}</h3>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="current-user">
                    <div className="avatar">
                        <img src={currentUserImage} alt="avatar" />
                    </div>
                    <div className="username">
                        <h3>{currentUserName}</h3>
                    </div>
                </div>
            </Container>
        )
    );
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 1fr 7fr 1.2fr;
    overflow: hidden;
    background-color: #080420;
    .brand {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        img {
            height: 2rem;
        }
        h3 {
            color: white;
        }
    }
    .contacts {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        gap: 0.8rem;
        &::-webkit-scrollbar {
            width: 0.2rem;
            &-thumb {
                background-color: #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }
        .contact {
            background-color: #ffffff39;
            min-height: 5rem;
            width: 90%;
            cursor: pointer;
            border-radius: 0.2rem;
            padding: 0.4rem;
            gap: 1rem;
            align-items: center;
            display: flex;
            transition: 0.3s ease-in-out;
            .avatar {
                img {
                    height: 3rem;
                }
            }
            .username {
                h3 {
                    color: white;
                }
            }
        }
        .selected {
            background-color: #bf5eff;
        }
    }
    .current-user {
        background-color: #0d0d30;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.4rem;
        gap: 1rem;
        .avatar {
            img {
                height: 4rem;
                max-inline-size: 100%;
            }
        }
        .username {
            h3 {
                color: white;
            }
        }
        @media screen and(min-width: 720px) and (max-width: 1080px) {
            padding: 0.2rem;
            gap: 0.5rem;
            .username {
                h2 {
                    font-size: 1rem;
                }
            }
        }
    }
    @media (max-width: 992px) {
        grid-template-rows: 1fr 7fr;
        .current-user {
            display: none;
        }
    }
`;

export default Contacts;
