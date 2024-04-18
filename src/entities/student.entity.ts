import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Tuition } from './tuition.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the student' })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ description: 'The student number', example: 'S12345' })
  studentNo: string;

  @Column()
  @ApiProperty({ description: 'The name of the student' })
  name: string;

  @Column()
  @ApiProperty({ description: 'The email address of the student' })
  email: string;

  @Column()
  @ApiProperty({description: 'Student password', example: 12345})
  password: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  @ApiProperty({ description: 'The wallet balance of the student', example: 1000.00 })
  balance: number;

  @Column({ default: 'student' }) 
  role: string;

  @OneToMany(() => Tuition, tuition => tuition.student)
  tuitions: Tuition[];
}
