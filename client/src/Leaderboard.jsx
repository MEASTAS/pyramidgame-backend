import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Leaderboard() {
    const navigate = useNavigate();
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const fetchPlayers = async () => {
            const response = await fetch("https://pyramidgame-backend.onrender.com/players");
            const data = await response.json();
            setPlayers(Object.entries(data).map(([name, info]) => ({ name, position: info.position })));
        };

        fetchPlayers();
        const interval = setInterval(fetchPlayers, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="leaderboard">
            <h2>Leaderboard (Piramida)</h2>
            <div className="pyramid">
                {players.sort((a, b) => b.position - a.position).map((p, index) => (
                    <div key={index} className="pyramid-level">
                        <span>{p.name} - Posisi {p.position}</span>
                    </div>
                ))}
            </div>

            <button onClick={() => navigate("/")}>Kembali ke Profile</button>
        </div>
    );
}

export default Leaderboard;
