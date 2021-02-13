import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { comparePassword } from '../../utils/password';
import { AuthTokens } from './args/auth-tokens';
import { generateToken } from '../../utils/jwt';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  /**
   * @description validates user credentials
   * @param email
   * @param password
   */
  async validateByEmail(email: string, password: string): Promise<AuthTokens> {
    const user = await this.userService.findByEmail(email);
    if (
      user &&
      user.password &&
      (await comparePassword(user.password, password))
    ) {
      const token = await generateToken(user);
      return {
        accessToken: token,
      };
    }
    throw new UnauthorizedException('username or password incorrect');
  }
}
