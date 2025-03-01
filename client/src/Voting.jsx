import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Voting({ player }) {
    const navigate = useNavigate();
    const [selectedPlayer, setSelectedPlayer] = useState("");
    const [message, setMessage] = useState("");

    const handleVote = async () => {
        if (!selectedPlayer) {
            setMessage("Pilih pemain terlebih dahulu!");
            return;
        }

        const response = await fetch("https://pyramidgame-backend.onrender.com/vote", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ voter: player.name, target: selectedPlayer }),
        });

        const data = await response.json();
        setMessage(data.message);
    };

    return (
        <div className="voting-container">
            <h1>Voting</h1>
            <select onChange={(e) => setSelectedPlayer(e.target.value)}>
                <option value="">Pilih Pemain</option>
                <option value="Player A">Player A</option>
                <option value="Player B">Player B</option>
                <option value="Player C">Player C</option>
                <option value="Player D">Player D</option>
                <option value="Player E">Player E</option>
                <option value="Player F">Player F</option>
                <option value="Player G">Player G</option>
                <option value="Player H">Player H</option>
            </select>
            <button onClick={handleVote}>Vote</button>
            {message && <p>{message}</p>}

            <button onClick={() => navigate("/")}>Kembali ke Profile</button>
        </div>
    );
}

export default Voting;
