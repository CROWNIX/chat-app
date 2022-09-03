import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chalk from "chalk";
import "./utils/db.js";
import api from "./routes/api.js";
import {Server} from "socket.io";
import http from "http";

dotenv.config();

const app = express();
const port = process.env.APP_PORT || 3000;
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});

app.use(cors());
app.use(express.json());
app.use("/api", api);

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-receive", data.message);
        }
    });
});

server.listen(port, () => {
    console.error(`${process.env.APP_NAME} Listening At\n\n ${chalk.white.bold("Local:")} ${chalk.green(`http://localhost:${port}`)}`);
});

// no kk = 3328041504130019
// nik = 3328042701870002
// 27/01/1987
