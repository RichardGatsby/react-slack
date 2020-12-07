import * as express from "express";
import * as http from "http";
import * as WebSocket from "ws";

export interface Message {
  channelId: number;
  userName: string;
  content: string;
  timeStamp: string;
}
const app = express();

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws: WebSocket) => {
  ws.on("message", (messageStr: string) => {
    let message: Message = JSON.parse(messageStr);
    if (message.content) {
      wss.clients.forEach((client) => {
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
  console.log(
    `Server started on port ${
      (server?.address() as WebSocket.AddressInfo).port
    } :)`
  );
});
