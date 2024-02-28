import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { todo } from './typeorm/entitiy/todo';
import { MyWebSocketGateway } from './socket/websocket.gateway';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { MessageModule } from './message/message.module';
import { Message } from './message/entities/message.entity';
import { ChatModule } from './chat/chat.module';
import { Chat } from './chat/entities/chat.entity';
import { NotificationModule } from './notification/notification.module';
import { Notification } from './notification/entities/notification.entity';
import { NotificationGateway } from './notification/notification.controller';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql-d4b7280-betelhembelete0-3754.a.aivencloud.com', //'localhost'
      port: 21074,
      username: 'avnadmin',
      password: 'AVNS_aYuQtP9yA4h10j3cUDk',
      database: 'defaultdb',
      entities: [todo, User, Message, Chat, Notification],
      synchronize: true,
    }),
    TodoModule,
    UserModule,
    MessageModule,
    ChatModule,
    NotificationModule,
    AdminModule,
  ],
  providers: [NotificationGateway], // this is for websoket connection
})
export class AppModule {}
