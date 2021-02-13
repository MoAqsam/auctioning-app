import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../users/users.model';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { AuthTokens } from './args/auth-tokens';
import { LoginInput } from './args/login-input';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { generateToken } from '../../utils/jwt';
import { RegisterInput } from './args/register-input';
import { hashPassword } from '../../utils/password';
import { validateEmail } from '../../utils/email';

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
    if (
      !user.email ||
      !user.password ||
      user.email === '' ||
      user.password === ''
    ) {
      throw new BadRequestException('Username or password missing');
    }
    if (!validateEmail(user.email)) {
      throw new BadRequestException('Invalid email');
    }
    if (await this.userService.findByEmail(user.email)) {
      throw new BadRequestException('email already exists');
    }
    user.password = await hashPassword(user.password);
    try {
      await this.userService.createUser(user);
    } catch (err) {
      throw new BadRequestException(err);
    }
    const token = await generateToken(user);
    return {
      accessToken: token,
    };
  }

  @Query(() => AuthTokens)
  async login(@Args('input') input: LoginInput): Promise<AuthTokens> {
    const { email, password } = input;
    const authentication = await this.authService.validateByEmail(
      email,
      password,
    );
    if (!authentication) {
      throw new ForbiddenException('Invalid login');
    }
    return authentication;
  }
}
