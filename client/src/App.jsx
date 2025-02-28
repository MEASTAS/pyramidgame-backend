import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./Profile";
import Voting from "./Voting";
import Leaderboard from "./Leaderboard";
import Chat from "./Chat";
import "./style.css";

function App() {
    const [code, setCode] = useState("");
    const [message, setMessage] = useState("");
    const [player, setPlayer] = useState(null);

    const handleLogin = async () => {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code }),
        });

        const data = await response.json();
        if (data.success) {
            setPlayer(data.player);
        } else {
            setMessage("Kode salah, coba lagi!");
        }
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={player ? <Profile player={player} /> : (
                    <div className="login-container">
                        <h1>Masukkan Kode Rahasia</h1>
                        <input
                            type="text"
                            placeholder="Kode Rahasia"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                        <button onClick={handleLogin}>Login</button>
                        {message && <p style={{ color: "red" }}>{message}</p>}
                    </div>
                )} />
                <Route path="/voting" element={<Voting player={player} />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/chat" element={<Chat username={player?.name} />} />
            </Routes>
        </Router>
    );
}

export default App;
