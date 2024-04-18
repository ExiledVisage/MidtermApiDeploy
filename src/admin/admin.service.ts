import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { Tuition } from 'src/entities/tuition.entity';
import { Student } from 'src/entities/student.entity';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Tuition)
        private readonly tuitionRepository: Repository<Tuition>,
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,
      ) {}
    
      async addTuition(studentNo: string, term: string): Promise<any> {
        // Find student by studentNo
        const student = await this.studentRepository.findOne({where: { studentNo }});
        if (!student) {
          return { error: 'Student not found' };
        }
    
        // Add tuition amount for the given student and term
        const tuition = new Tuition();
        tuition.student = student;
        tuition.term = term;
        tuition.tuitionTotal = 0; // Set initial tuition total
        tuition.balance = 0; // Set initial balance
        await this.tuitionRepository.save(tuition);
    
        return { status: 'Success' };
      }
    
      async getUnpaidTuition(term: string): Promise<any> {
        // Find students with unpaid tuition amounts for the specified term
        const unpaidTuition = await this.tuitionRepository.find({
            where: { term, balance: MoreThan(0) }, // Use MoreThan(0) to find balances greater than 0
            relations: ['student'], // Include the 'student' relation to fetch associated student data
          });
    
        return unpaidTuition.map(tuition => ({
          studentNo: tuition.student.studentNo,
          name: tuition.student.name,
          unpaidBalance: tuition.balance,
        }));
      }
}
