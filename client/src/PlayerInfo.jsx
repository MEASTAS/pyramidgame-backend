function PlayerInfo({ player }) {
    return (
        <div className="player-info">
            <h2>Informasi Pemain</h2>
            <p><strong>Nama:</strong> {player.name}</p>
            <p><strong>Posisi:</strong> {player.position}</p>
        </div>
    );
}

export default PlayerInfo;
