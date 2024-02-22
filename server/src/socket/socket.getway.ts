import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

@WebSocketGateway({cors: '*'})
export class getway{

@WebSocketServer()
server;

@SubscribeMessage('message')
handleMessage(@MessageBody() message : string):void {
    this.server.emit('message', message);
    console.log(message)
}}