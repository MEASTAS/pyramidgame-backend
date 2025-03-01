import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./style.css";
import Voting from "./Voting";
import Chat from "./Chat";
import Leaderboard from "./Leaderboard";

function App() {
    const [code, setCode] = useState("");
    const [message, setMessage] = useState("");
    const [player, setPlayer] = useState(null);

    const handleLogin = async () => {
        const response = await fetch("https://pyramid-backend.onrender.com/login", {
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
            <div className="container">
                <h1 className="glitch" data-text="PYRAMID GAME">PYRAMID GAME</h1>
                <p>Selamat datang di permainan misterius. Apakah kamu siap?</p>

                {!player ? (
                    <div className="login-box">
                        <input
                            type="text"
                            placeholder="Masukkan Kode Rahasia"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                        <button onClick={handleLogin}>Masuk</button>
                        {message && <p className="error">{message}</p>}
                    </div>
                ) : (
                    <div className="dashboard">
                        <h2>Selamat datang, {player.name}!</h2>
                        <p>Posisi kamu: {player.position}</p>
                        <nav>
                            <Link to="/voting"><button>Masuk ke Voting</button></Link>
                            <Link to="/leaderboard"><button>Lihat Leaderboard</button></Link>
                            <Link to="/chat"><button>Masuk ke Chat</button></Link>
                        </nav>
                    </div>
                )}
            </div>

            <Routes>
                <Route path="/voting" element={<Voting />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/chat" element={<Chat />} />
            </Routes>
        </Router>
    );
}

export default App;
