"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const app = express();
//initialize a simple http server
const server = http.createServer(app);
//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });
wss.on("connection", (ws) => {
    ws.on("message", (messageStr) => {
        let message = JSON.parse(messageStr);
        if (message.content) {
            message.timeStamp = new Date().toISOString();
            //send back the message to the other clients
            console.log(wss.clients);
            wss.clients.forEach((client) => {
                console.log("CLIENT: ", client);
                console.log("ws: ", ws);
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(message));
                }
            });
        }
    });
    //send immediatly a feedback to the incoming connection
});
//start our server
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${(server === null || server === void 0 ? void 0 : server.address()).port} :)`);
});
//# sourceMappingURL=server.js.map