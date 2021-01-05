import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../users/users.model';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { AuthTokens } from './args/auth-tokens';
import { LoginInput } from './args/login-input';
import { ForbiddenException } from '@nestjs/common';
import { generateToken } from '../../utils/jwt';
import { RegisterInput } from './args/register-input';
import { hashPassword } from '../../utils/password';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Query(() => User, { name: 'me' })
  async me() {
    return null;
  }

  @Mutation(() => AuthTokens)
  async register(@Args('input') input: RegisterInput): Promise<AuthTokens> {
    const user = new User(input);
    user.password = await hashPassword(user.password);
    await this.userService.createUser(user);
    const token = await generateToken(user);
    return {
      accessToken: token,
    };
  }

  @Mutation(() => AuthTokens)
  async login(@Args('input') input: LoginInput): Promise<AuthTokens> {
    const { username, password } = input;
    const authentication = await this.authService.validateByUsername(
      username,
      password,
    );
    if (!authentication) {
      throw new ForbiddenException('Invalid login');
    }
    return authentication;
  }
}
