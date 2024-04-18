import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { Tuition } from 'src/entities/tuition.entity';
import { Student } from 'src/entities/student.entity';
import { Admin } from 'src/entities/admin.entity';
import { from, throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly authService: AuthService,
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,
        @InjectRepository(Tuition)
        private readonly tuitionRepository: Repository<Tuition>,
        @InjectRepository(Admin)
        private readonly adminRepository: Repository<Admin>,
        
      ) {}
    
      async addTuition(studentNo: string, term: string): Promise<any> {
        
        const student = await this.studentRepository.findOne({where: { studentNo }});
        if (!student) {
          return { error: 'Student not found' };
        }
    
        
        const tuition = new Tuition();
        tuition.student = student;
        tuition.term = term;
        tuition.tuitionTotal = 5000; 
        tuition.balance = tuition.tuitionTotal; 
        await this.tuitionRepository.save(tuition);
    
        return { status: 'Success' };
      }
    
      async getUnpaidTuition(term: string): Promise<any> {
        
        const unpaidTuition = await this.tuitionRepository.find({
            where: { term, balance: MoreThan(0) }, 
            relations: ['student'], 
          });
    
        return unpaidTuition.map(tuition => ({
          studentNo: tuition.student.studentNo,
          name: tuition.student.name,
          unpaidBalance: tuition.balance,
        }));
      }

      async generateAdminToken(admin: Admin): Promise<string> {
        const { id, username, role } = admin; 
        const payload = { sub: id, username, role }; 
        return this.authService.generateToken(payload);
      }

      registerAdmin(admin: Admin): Observable<Admin> {
        return from(this.adminRepository.save(admin)).pipe(
          catchError((error) => throwError(error))
        );
      }

      async login(username: string, password: string): Promise<{ token: string }> {
        
        const admin = await this.adminRepository.findOne({ where: { username } });
        if (!admin) {
          throw new Error('Admin not found');
        }
    
       
        if (admin.password !== password) {
          throw new Error('Incorrect password');
        }
    
        
        const token = this.jwtService.sign({ username: admin.username, role: admin.role });
    
        return { token };
      }
}
