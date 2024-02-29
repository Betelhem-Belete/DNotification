import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(@InjectRepository(Chat)private chat : Repository<Chat>){}
  async create(createChatDto: CreateChatDto) {
    try {
      // Check if a chat record exists with the same sender or receiver
      const existingChat = await this.chat.findOne({
        where: [
          { sender: createChatDto.sender, receiver: createChatDto.receiver },
          { sender: createChatDto.receiver, receiver: createChatDto.sender }
        ],
      });
  
      if (existingChat) {
        // If a chat record already exists, send that record
        console.log('Existing chat:', existingChat);
        return existingChat;
      } else {
        // If no chat record exists, create a new one
        const newChat = await this.chat.create({
          sender: createChatDto.sender,
          receiver: createChatDto.receiver,
        });
        // Save the newly created chat record
        const savedChat = await this.chat.save(newChat);
        console.log('Newly created chat:', savedChat);
        return savedChat;
      }
    } catch (error) {
      console.error('Error creating or fetching chat:', error);
      throw new Error('Error creating or fetching chat');
    }
  }
  
  

  async findAll() {
    const all_chats = await this.chat.find()
    return all_chats;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
