import { useEffect, useState } from "react";
import Chat from "./Chat";
import Voting from "./Voting";

function Dashboard({ player }) {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const fetchPlayers = async () => {
            const response = await fetch("http://localhost:3000/players");
            const data = await response.json();
            setPlayers(Object.entries(data).map(([name, info]) => ({ name, position: info.position })));
        };

        fetchPlayers();
        const interval = setInterval(fetchPlayers, 3000);
        return () => clearInterval(interval);
    }, []);

    const processVoting = async () => {
        const response = await fetch("http://localhost:3000/process-voting", { method: "POST" });
        const data = await response.json();
        alert(data.message);
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Nama: {player.name}</p>
            <p>Posisi: Lapisan {player.position}</p>

            <Chat username={player.name} />
            <Voting player={player} players={players} />

            <button onClick={processVoting}>Proses Voting</button>

            <h3>Daftar Pemain:</h3>
            <ul>
                {players.map((p, index) => (
                    <li key={index}>{p.name} - Lapisan {p.position}</li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;
