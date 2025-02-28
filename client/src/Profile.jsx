import { useNavigate } from "react-router-dom";

function Profile({ player }) {
    const navigate = useNavigate();

    return (
        <div className="profile-container">
            <h1>Profil Pemain</h1>
            <p><strong>Nama:</strong> {player.name}</p>
            <p><strong>Posisi:</strong> {player.position}</p>

            <button onClick={() => navigate("/voting")}>Masuk ke Voting</button>
            <button onClick={() => navigate("/leaderboard")}>Lihat Leaderboard</button>
            <button onClick={() => navigate("/chat")}>Masuk ke Chat</button>
        </div>
    );
}

export default Profile;
