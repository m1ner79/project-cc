/*
@author Michal Gornicki
@Start Date 04/12/2022
*/
import React, {useContext, useEffect, useState} from "react";
import {Container, Image} from "react-bootstrap";
import {AuthDetails} from "./AuthDetails";
import {db} from "../firebase";
import {doc, onSnapshot} from "firebase/firestore";
import {MessageDetails} from "./MessageDetails";

const Chats = () => {
    const {loggedUser} = useContext(AuthDetails);
    const {dispatch} = useContext(MessageDetails);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            const unsub = onSnapshot(
                doc(db, "userMessages", loggedUser.uid),
                (doc) => {
                    setMessages(doc.data() || []);
                }
            );

            return () => {
                unsub();
            };
        };
        loggedUser.uid && fetchMessages();
    }, [loggedUser.uid]);
    // console.log(messages);

    const handleSelect = (u) => {
        dispatch({type: "CHANGE_USER", payload: u});
    };

    return (
        <Container className="lastMessages">
            {Object.entries(messages)
                ?.sort((a, b) => b[1].date - a[1].date)
                .map((mess) => (
                    <Container
                        className="loggedUserMessages"
                        key={mess[0]}
                        onClick={() => handleSelect(mess[1].userInfo)}
                    >
                        <Image
                            className="avatar"
                            src={mess[1].userInfo.photoURL}
                            width="30"
                            height="30"
                            alt="avatar"
                            roundedCircle
                        />
                        <Container className="userInfo">
                            <span>{mess[1].userInfo.displayName.toUpperCase()}</span>
                            <p>{mess[1].lastMessage?.text}</p>
                            {/*{console.log(mess[1].userInfo.displayName)}*/}
                            {/*{console.log(mess[1].lastMessage?.text)}*/}
                        </Container>
                    </Container>
                ))}
        </Container>
    );
};

export default Chats;
