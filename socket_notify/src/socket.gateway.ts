import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Observable, from, map } from 'rxjs';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect  {
  @WebSocketServer() server: Server;
  users: number = 0;
  clients: Socket[] = [];

  handleConnection(client: Socket) {
    this.users++;
    this.clients.push(client);
    console.log('USER CONNECTED: ', this.users);
    client.send('connected')
  }

  handleDisconnect(client: Socket) {
    this.users--;
    const index = this.clients.indexOf(client);
    if (index !== -1) {
      this.clients.splice(index, 1);
    }
    console.log('USER Disconnected: ', this.users);
  }

  sendToAllClients(event: string, data: any) {
    this.clients.forEach(client => {
      client.send(data);
    });
  }
}