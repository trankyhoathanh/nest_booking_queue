import { Server, Socket } from 'socket.io';
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotifyGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
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
  
  sendToAllClients(data: any) {
    this.server.emit('booking', data);
  }
}
