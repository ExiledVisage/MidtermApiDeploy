import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Student} from './student.entity';
import { Tuition } from './tuition.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student)
  @JoinColumn({ name: 'studentId' })
  student: Student;

  @ManyToOne(() => Tuition)
  @JoinColumn({ name: 'tuitionId' })
  tuition: Tuition;

  @Column()
  term: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  paymentAmount: number;

  @Column({ default: 'Successful' }) 
  status: string;
}