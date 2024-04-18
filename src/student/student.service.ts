import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from 'src/entities/student.entity';
import { from, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class StudentService {
  constructor(
    
    private readonly jwtService: JwtService,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  registerStudent(student: Student): Observable<Student> {
    return from(this.studentRepository.save(student)).pipe(
      catchError((error) => throwError(error))
    );
  }
  async login(email: string, password: string): Promise<string> {
    const student = await this.validateStudent(email, password);
    if (!student) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.generateStudentToken(student);
  }

  private async validateStudent(email: string, password: string): Promise<Student | null> {
    const student = await this.studentRepository.findOne({ where: { email, password } });
    return student || null;
  }

  async generateStudentToken(student: Student): Promise<string> {
    const { id, email } = student; // Assuming your Student entity has these properties
    const payload = { sub: id, email }; // Customize payload as needed
    return this.jwtService.sign(payload);
  }


}

