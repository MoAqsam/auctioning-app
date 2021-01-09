import {
  Args,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { User } from './users.model';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';

@Resolver((of: any) => User)
export class UsersResolver {
  constructor(private userService: UsersService) {}
  @Query(() => User, { name: 'user' })
  @UseGuards(AuthGuard)
  async user(@Args('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }

  @Query(() => [User], { name: 'users' })
  async users(): Promise<User[]> {
    return await this.userService.find();
  }

  // placeholder query
  @Query(() => Message, { name: 'helloworld' })
  async helloworld(): Promise<Message> {
    const message = new Message();
    message.message = 'hello world';
    return message;
  }

  @Mutation(() => User)
  async createUser(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<User> {
    const user = new User({ username, password });
    return this.userService.createUser(user);
  }
}

@ObjectType()
class Message {
  @Field()
  message: string;
}
