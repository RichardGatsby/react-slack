"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const cors = require("cors");
const channels = [
    { name: "General", id: 0, messages: [] },
    { name: "Development", id: 1, messages: [] },
    { name: "Memes", id: 2, messages: [] },
];
const app = express();
app.use(cors());
//define routes
app.get("/channels", (req, res, next) => {
    res.json(channels);
});
app.get("/channels/:id", (req, res, next) => {
    console.log("Requestin chan with id: ", req.params.id);
    res.json(channels);
});
//initialize a simple http server
const server = http.createServer(app);
//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });
wss.on("connection", (ws) => {
    ws.on("message", (messageStr) => {
        let message = JSON.parse(messageStr);
        if (message.content) {
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(message));
                }
            });
        }
    });
});
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${(server === null || server === void 0 ? void 0 : server.address()).port} :)`);
});
//# sourceMappingURL=server.js.map