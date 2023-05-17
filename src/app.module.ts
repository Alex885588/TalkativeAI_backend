import { Module } from '@nestjs/common';
import { AppController } from './DBcontroller/app.controller';
import { AppService } from './DBservices/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chats } from './DBtables/chats';
import { User } from './DBtables/user';
import { Messages } from './DBtables/messages';
import { UserAuthController } from './Auth/Authcontroller/auth.controller';
import { UserAuthService } from './Auth/Authservice/auth.service';
import { ChatsController } from './DBcontroller/chat.controller';
import { ChatsService } from './DBservices/chat.service';
import { MessagesController } from './DBcontroller/message.controller';
import { MessagesService } from './DBservices/message.service';
import { AiService } from './DBservices/ai.service';
import { AiController } from './DBcontroller/ai.controller';
import { AI } from './DBtables/ai';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './Auth/Strategy/jwt.strategy';
import { AIMapper } from './Mapper/EntityMappers/ai.mapper';
import { ChatsMapper } from './Mapper/EntityMappers/chats.mapper';
import { UserMapper } from './Mapper/EntityMappers/user.mapper';
import { MessagesMapper } from './Mapper/EntityMappers/messages.mapper';
import { WorkersType } from './DBtables/workers.type';
import { Workers } from './DBtables/workers';
import { WorkersTypeController } from './DBcontroller/workers.type.controller';
import { WorkersController } from './DBcontroller/workers.controller';
import { WorkersMapper } from './Mapper/EntityMappers/worker.mapper';
import { WorkersTypeMapper } from './Mapper/EntityMappers/workers.type.mapper';
import { WorkersTypeService } from './DBservices/workers.type.service';
import { WorkersService } from './DBservices/workers.service';
import { AWService } from './DBservices/aws.service';
import { UsersInChats } from './DBtables/users.in.chats';
import { UsersInChatsController } from './DBcontroller/users.in.chats.controller';
import { UsersInChatsMapper } from './Mapper/EntityMappers/users.in.chats.mapper';
import { usersInChatsService } from './DBservices/users.in.chats.service';
import { ChatGPTService } from './DBservices/AiServices/chatgpt.services';
import { ChatGPTController } from './DBcontroller/chatgpt.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Alex445577&&',   
      database: 'FinalProject',
      entities: [Chats, User, Messages, AI, Workers, WorkersType,UsersInChats],
      synchronize: true,
    }),

    TypeOrmModule.forFeature([Chats, User, Messages, AI, User,Workers, WorkersType,UsersInChats]),
    PassportModule,
    JwtModule.register({
      secret: process.env.MY_SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AppController, ChatsController, MessagesController, AiController,ChatGPTController, UserAuthController,WorkersTypeController,WorkersController,UsersInChatsController,],
  providers: [AppService, ChatsService,AWService, MessagesService, AiService,ChatGPTService,UserAuthService, WorkersTypeService,WorkersService, JwtStrategy, AIMapper, ChatsMapper, UserMapper, MessagesMapper,WorkersMapper,WorkersTypeMapper,UsersInChatsMapper,usersInChatsService],
  exports: [JwtStrategy, PassportModule],
})
export class AppModule { }
