import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './graphql/users/users.module';
import { AuthModule } from './graphql/auth/auth.module';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

const db_url =
  process.env.DATABASE_URL || 'postgresql://mo:postgres@localhost:5432/mo';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error.extensions.exception.response.message || error.message,
        };
        return graphQLFormattedError;
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: db_url,
      entities: ['dist/**/*.model.js'],
      synchronize: false,
    }),
    UsersModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
