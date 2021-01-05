import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { AuthResolver } from './auth.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.model';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthResolver, AuthService, UsersService],
})
export class AuthModule {}
