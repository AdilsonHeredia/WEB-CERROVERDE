import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import Messenger from "./Mensajes"; // Importa el componente Messenger

export default function ChatOnline({ onlineUsers, setCurrentChat }) {
    const [friends, setFriends] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null); // Estado para el usuario seleccionado

    const currentUserId = localStorage.getItem("Id");

    useEffect(() => {
        const getFriends = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8800/api/users/friends/${currentUserId}`
                );
                if (response.ok) {
                    const data = await response.json();
                    setFriends(data);
                } else {
                    console.log("Error fetching friends");
                }
            } catch (error) {
                console.error("Error fetching friends: ", error);
            }
        };

        getFriends();
    }, [currentUserId]);

    const handleClick = (user) => {
        setSelectedUser(user); // Establece el usuario seleccionado
    };

    return (
        <div>
            <div className="chat-online-container">
                <h2>Usuarios</h2>
                <ul className="user-list">
                    {friends.map((user) => (
                        <li key={user._id} onClick={() => handleClick(user)} className="user-item">
                            <div className="user-avatar">
                                <PersonIcon />
                            </div>
                            <div className="user-name">{`${user.nombre} ${user.apellidoP} ${user.apellidoM}`}</div>
                        </li>
                    ))}
                </ul>
            </div>
            {selectedUser && (
                <Messenger user={selectedUser} setCurrentChat={setCurrentChat} />
            )}
        </div>
    );
}
