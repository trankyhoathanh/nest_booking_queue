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
    client.send('connected', `Welcome connected ${client.id}`)
  }

  handleDisconnect(client: Socket) {
    this.users--;
    const index = this.clients.indexOf(client);
    if (index !== -1) {
      this.clients.splice(index, 1); // Remove the disconnected client from the array
    }
    console.log('USER Disconnected: ', this.users);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() body: any): string {
    // console.log(`Received message from ${client.id}:`, payload);
    console.log(body);
    try {
      this.clients.forEach(client => {
        client.send(`Broad cast ${body}`);
      });
    } catch (err) {
      console.log(err);
    }
    return `Hello ${body}`;
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    this.server.send('2','3');
    return data;
  }

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  }

  sendToAllClients(event: string, data: any) {
    this.clients.forEach(client => {
      client.send(data);
    });
  }
}