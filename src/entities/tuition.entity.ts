import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Student } from './student.entity';

@Entity()
export class Tuition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  term: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  tuitionTotal: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  balance: number;

  @ManyToOne(() => Student, student => student.tuitions)
  @JoinColumn({ name: 'studentId' })
  student: Student;

  @Column()
  studentId: number;
}