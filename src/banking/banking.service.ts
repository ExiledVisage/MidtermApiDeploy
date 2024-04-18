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

        
        if(student.balance  <= 0 ){
          return { error: "Wallet does not have money" };
        }

        
        const payment = new Payment();
        payment.student = student;
        payment.term = term;
        payment.paymentAmount = 0;
        payment.status = 'Successful';
        
    
       
        const tuitionBalanceFinal =  tuition.balance - student.balance;
        const studentBalanceFinal = student.balance - tuition.balance;

        if(tuitionBalanceFinal < 0){
          payment.paymentAmount = tuition.balance;          
          tuition.balance = 0;
          student.balance = studentBalanceFinal;
        }
        else if( tuitionBalanceFinal == 0){
          payment.paymentAmount = student.balance;
          tuition.balance = 0; 
          student.balance = 0;
        }
        else{
          tuition.balance = tuitionBalanceFinal;
          payment.paymentAmount = student.balance;
          student.balance = 0;
        }

        
        
    
        await this.paymentRepository.save(payment);
    
        
        await this.tuitionRepository.save(tuition);
        await this.studentRepository.save(student);
    
        return { status: 'Successful' };
      }

}
