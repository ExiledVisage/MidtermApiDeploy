import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the admin' })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ description: 'The username of the admin', example: 'admin' })
  username: string;

  @Column()
  @ApiProperty({ description: 'The password of the admin', example: 'password' })
  password: string;

  @Column({ default: 'admin' }) 
  @ApiProperty({ description: 'The role of the admin', example: 'admin' })
  role: string;
}