import { User } from '../../graphql/users/users.model';
import { sign, decode, verify } from 'jsonwebtoken';
import { JWT_SECRET } from '../../environments';
import { UnauthorizedException } from '@nestjs/common';

/**
 * @description creates JWT token based off of User model
 * @param user
 */
export function generateToken(user: User) {
  const { id, email, username } = user;
  return sign(
    {
      id,
      email,
      username,
    },
    JWT_SECRET,
    {
      algorithm: 'HS256',
      expiresIn: '30m', // 15m
    },
  );
}

export async function verifyToken(token: string) {
  await verify(token, JWT_SECRET, (err, response) => {
    if (err) {
      throw new UnauthorizedException(
        'Authentication token is invalid, please try again.'
      );
    }
  });
}
