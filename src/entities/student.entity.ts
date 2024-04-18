import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Tuition } from './tuition.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  studentNo: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => Tuition, tuition => tuition.student)
  tuitions: Tuition[];
}
