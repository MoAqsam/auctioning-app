import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'users' })
export class User extends BaseEntity {
  constructor(user?: Partial<User>) {
    super();
    if (user) {
      this.id = user.id;
      this.username = user.username;
      this.email = user.email;
      this.first_name = user.first_name;
      this.last_name = user.last_name;
      this.password = user.password;
    }
  }
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ length: 250, nullable: true })
  email: string;

  @Field()
  @Column({ length: 250, nullable: true })
  first_name: string;

  @Field()
  @Column({ length: 250, nullable: true })
  last_name: string;

  @Field()
  @Column({ length: 250, nullable: false })
  username: string;

  @Field()
  @Column({ length: 500, nullable: false })
  password: string;

  @Field()
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
