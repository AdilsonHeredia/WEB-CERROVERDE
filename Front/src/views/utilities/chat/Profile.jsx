import React, { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
    const [user, setUser] = useState(null);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        if (conversation) {
            const friendId = conversation.members.find((m) => m !== currentUser._id);

            const getUser = async () => {
                try {
                    const response = await fetch(`/users?userId=${friendId}`);
                    if (response.ok) {
                        const data = await response.json();
                        setUser(data);
                    } else {
                        console.error("Error al obtener datos del usuario");
                    }
                } catch (err) {
                    console.error(err);
                }
            };
            getUser();
        }
    }, [currentUser, conversation]);

    if (!conversation) {
        return null; // Agrega una comprobación para manejar la conversación nula o no definida
    }

    return (
        <div className="conversation">
            <img
                className="conversationImg"
                src={
                    user?.profilePicture
                        ? PF + user.profilePicture
                        : PF + "person/noAvatar.png"
                }
                alt=""
            />
            <span className="conversationName">{user?.username}</span>
        </div>
    );
}
