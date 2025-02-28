import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import schedule from "node-schedule"; // Untuk reset otomatis

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// Data pemain (Semua mulai dari posisi 0)
let players = {
    "Player A": { position: 0 },
    "Player B": { position: 0 },
    "Player C": { position: 0 },
    "Player D": { position: 0 },
    "Player E": { position: 0 },
    "Player F": { position: 0 },
    "Player G": { position: 0 },
    "Player H": { position: 0 },
};

// Kode rahasia untuk login
const validCodes = {
    "4mpt1": "Player A",
    "4mpt2": "Player B",
    "4mpt3": "Player C",
    "4mpt4": "Player D",
    "4mpt5": "Player E",
    "4mpt6": "Player F",
    "4mpt7": "Player G",
    "4mpt8": "Player H",
};

// Data voting
let votes = {};

// Fungsi untuk cek hari
function getCurrentDay() {
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    return days[new Date().getDay()];
}

// API Login
app.post("/login", (req, res) => {
    const { code } = req.body;
    if (validCodes[code]) {
        const playerName = validCodes[code];
        res.json({ success: true, player: { name: playerName, position: players[playerName].position } });
    } else {
        res.json({ success: false, message: "Kode salah, coba lagi!" });
    }
});

// API Vote
app.post("/vote", (req, res) => {
    const currentDay = getCurrentDay();
    if (!["Selasa", "Rabu", "Kamis"].includes(currentDay)) {
        return res.status(400).json({ success: false, message: "Voting hanya boleh hari Selasa, Rabu, dan Kamis!" });
    }

    const { voter, target } = req.body;
    if (!voter || !target || !players[target]) {
        return res.status(400).json({ success: false, message: "Vote tidak valid!" });
    }

    votes[voter] = target;
    res.json({ success: true, message: `Kamu memilih ${target}` });
});

// API Proses Voting & Update Posisi (Hanya Bisa Hari Kamis Jam 4)
app.post("/process-voting", (req, res) => {
    const currentDay = getCurrentDay();
    const currentHour = new Date().getHours();

    if (currentDay !== "Kamis" || currentHour < 16) {
        return res.status(400).json({ success: false, message: "Hasil voting hanya keluar hari Kamis jam 4 sore!" });
    }

    let voteCount = {};
    Object.values(votes).forEach((target) => {
        voteCount[target] = (voteCount[target] || 0) + 1;
    });

    for (let player in players) {
        if (voteCount[player]) {
            players[player].position = Math.min(players[player].position + voteCount[player], 10);
        }
    }

    votes = {}; // Reset vote setelah dihitung
    res.json({ success: true, message: "Voting selesai, posisi diperbarui!" });
});

// API Reset Posisi Setiap Jumat
schedule.scheduleJob("0 0 * * 5", () => {
    for (let player in players) {
        players[player].position = 0;
    }
    console.log("Semua posisi direset ke 0 (Hari Jumat)");
});

// API Ambil Data Pemain
app.get("/players", (req, res) => {
    res.json(players);
});

// WebSocket - Chat Real-time
io.on("connection", (socket) => {
    socket.on("chatMessage", (data) => {
        io.emit("chatMessage", data);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// Jalankan Server
server.listen(3000, () => console.log("Server running on port 3000"));
