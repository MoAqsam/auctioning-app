import { Args, Field, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { User } from './users.model';
import { UsersService } from './users.service';
import { InternalServerErrorException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';

@Resolver((of: any) => User)
export class UsersResolver {
  constructor(private userService: UsersService) {}
  @Query(() => User, { name: 'user' })
  @UseGuards(AuthGuard)
  async user(@Args('id') id: string): Promise<User> {
    try {
      const user = await this.userService.findById(id);
      return user;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('error');
    }
  }
  // placeholder query
  @Query(() => Message, { name: 'helloworld' })
  async helloworld(): Promise<Message> {
    const message = new Message();
    message.message = 'hello world';
    return message;
  }
}

@ObjectType()
class Message {
  @Field()
  message: string;
}
