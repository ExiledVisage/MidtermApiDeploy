import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Student } from './student.entity';

@Entity()
export class Tuition {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the tuition' })
  id: number;

  @Column()
  @ApiProperty({ description: 'The term of the tuition' })
  term: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @ApiProperty({ description: 'The total amount of the tuition', example: 1000.00 })
  tuitionTotal: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @ApiProperty({ description: 'The remaining balance of the tuition', example: 500.00 })
  balance: number;

  @Column()
  @ApiProperty({ description: 'Student ID', example: 500.00 })
  studentId: number;

  @ManyToOne(() => Student, student => student.tuitions)
  @JoinColumn({ name: 'studentId' })
  student: Student;
}