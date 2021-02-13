import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './graphql/users/users.module';
import { AuthModule } from './graphql/auth/auth.module';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TerminusModule } from '@nestjs/terminus';

const db_url =
  process.env.DATABASE_URL || 'postgresql://mo:postgres@localhost:5432/mo';

@Module({
  imports: [
    GraphQLModule.forRoot({
      introspection: true,
      playground: true,
      autoSchemaFile: 'schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: db_url,
      entities: ['dist/**/*.model.js'],
      synchronize: false,
    }),
    UsersModule,
    AuthModule,
    TerminusModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
