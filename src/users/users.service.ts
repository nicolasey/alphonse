import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDocument } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) {}

  private saltRounds = 10;

  async getUsers(): Promise<UserDocument[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  async getUser(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id).exec();
    if (!user) { throw new NotFoundException('Customer does not exist'); }
    return user;
  }

  async getUserByEmail(email: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) { throw new NotFoundException('Customer does not exist'); }
    return user;
  }

  async createUser(user): Promise<UserDocument> {
    const passwordHash = await this.getHash(user.password);
    user.password = passwordHash;

    const newUser = await this.userModel.create(user);
    return newUser;
  }

  async updateUser(user): Promise<UserDocument> {
    const updatedUser = await this.userModel.findByIdAndUpdate(user._id, user, {new: true});
    if (!updatedUser) { throw new NotFoundException('Customer does not exist'); }
    return updatedUser;
  }

  async deleteUser(id: string): Promise<any> {
    const user =  await this.userModel.findByIdAndRemove(id);
    if (!user) { throw new NotFoundException('Customer does not exist'); }
    return user;
  }

  async getHash(password: string|undefined): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compareHash(password: string|undefined, hash: string|undefined) {
    return bcrypt.compare(password, hash);
  }
}
