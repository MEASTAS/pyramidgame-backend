import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const socket = io("https://pyramidgame-backend.onrender.com");

function Chat({ username }) {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("chatMessage", (data) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => socket.off("chatMessage");
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit("chatMessage", { username, message });
            setMessage("");
        }
    };

    return (
        <div className="chat-container">
            <h2>Chat</h2>
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <p key={index}><strong>{msg.username}:</strong> {msg.message}</p>
                ))}
            </div>
            <input type="text" placeholder="Tulis pesan..." value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={sendMessage}>Kirim</button>

            <button onClick={() => navigate("/")}>Kembali ke Profile</button>
        </div>
    );
}

export default Chat;
