import * as express from "express";
import * as http from "http";
import * as WebSocket from "ws";
import * as cors from "cors";

export interface Message {
  channelId: number;
  userName: string;
  content: string;
  timeStamp: Message;
}
export interface Channel {
  name: string;
  id: number;
  messages: Message[];
}

const channels: Channel[] = [
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
});

server.listen(process.env.PORT || 8999, () => {
  console.log(
    `Server started on port ${
      (server?.address() as WebSocket.AddressInfo).port
    } :)`
  );
});
