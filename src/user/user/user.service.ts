import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema/user.schema';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto); 
    return createdUser.save(); 
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userModel.findOne({ $or: [{ id }, { uid: id }] }).exec();
  }

  async getUserByFirstName(first_name: string): Promise<User | null> {
    return this.userModel.findOne({ first_name }).exec();
  }

  async updateLastContribution(userId: string, newContribution: number): Promise<User | null> {
    const user = await this.userModel.findOneAndUpdate(
      { $or: [{ id: userId }, { uid: userId }] },
      { $set: { lastContribution: newContribution } },  // Update the lastContribution field
      { new: true }  // Return the updated document
    ).exec();

    return user;
  }

  async migrateIdAndUid(): Promise<void> {
    try {
      const users = await this.userModel.find().exec(); 

      for (const user of users) {
        if (!user.id && user.uid) {
          user.id = user.uid;
          await user.save(); 
        }
      }

      console.log('Migration completed.');
    } catch (error) {
      console.error('Error during migration:', error); 
    }
  }
}
