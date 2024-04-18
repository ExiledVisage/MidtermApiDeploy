import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tuition } from 'src/entities/tuition.entity';
import { Payment } from 'src/entities/payment.entity';
import { Student } from 'src/entities/student.entity';

@Injectable()
export class BankingService {

    constructor(
        @InjectRepository(Tuition)
        private readonly tuitionRepository: Repository<Tuition>,
        @InjectRepository(Payment)
        private readonly paymentRepository: Repository<Payment>,
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>
        
      ) {}
    
      async queryTuition(studentNo: string): Promise<any> {
        const tuition = await this.tuitionRepository.findOne({ where:{student: { studentNo: studentNo }} });
    
        if (!tuition) {
          return { error: 'Tuition information not found' };
        }
    
        return { tuitionTotal: tuition.tuitionTotal, balance: tuition.balance };
      }
    
      async payTuition(studentNo: string, term: string): Promise<any> {
        const student = await this.studentRepository.findOne({ where: { studentNo } });
        if (!student) {
          return { error: 'Student not found' };
        }
    
        const tuition = await this.tuitionRepository.findOne({ where: { studentId: student.id, term } });
        if (!tuition) {
          return { error: 'Tuition information not found for the specified term' };
        }
    
        // Verify payment amount and update balance
        const paymentAmount = tuition.tuitionTotal;
        const remainingBalance = tuition.balance - paymentAmount;
    
        // Check if payment amount matches tuition total
        if (remainingBalance < 0) {
          return { error: 'Insufficient funds: Payment amount exceeds tuition total' };
        }
    
        // Record payment
        const payment = new Payment();
        payment.student = student;
        payment.term = term;
        payment.paymentAmount = paymentAmount;
        payment.status = 'Successful';
    
        await this.paymentRepository.save(payment);
    
        // Update balance
        tuition.balance = remainingBalance;
        await this.tuitionRepository.save(tuition);
    
        return { status: 'Successful' };
      }

}
