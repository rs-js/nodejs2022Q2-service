import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';
import { v4 } from 'uuid';

@Injectable()
export class UserService {
  private users: User[] = [];

  create(createUserDto: CreateUserDto): Partial<User> {
    const user: User = {
      ...createUserDto,
      id: v4(),
      createdAt: Date.now(),
      version: 1,
      updatedAt: Date.now(),
    };
    this.users.push(user);
    const { password, ...other } = user;
    return other;
  }

  findAll(): Partial<User>[] {
    return this.users.map((user) => {
      const { password, ...other } = user;
      return other;
    });
  }

  findUser(id: string): User {
    const user = this.users.find((user) => id === user.id);
    if (user) {
      return user;
    } else {
      throw new NotFoundException(`User with id:${id} doesn't exist`);
    }
  }

  findOne(id: string): Partial<User> {
    const user = this.findUser(id);
    if (user) {
      const { password, ...other } = user;
      return other;
    }
  }

  update(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ): Partial<User> {
    const user = this.findUser(id);
    if (user && oldPassword === user.password) {
      user.password = newPassword;
      user.updatedAt = Date.now();
      user.version++;
      const { password, ...other } = user;
      return other;
    } else {
      throw new ForbiddenException('Authentication failed');
    }
  }

  remove(id: string) {
    if (this.findOne(id)) {
      this.users = this.users.filter((user) => user.id !== id);
    }
  }
}
