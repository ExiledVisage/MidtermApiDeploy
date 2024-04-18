import { Controller, Post, Body} from '@nestjs/common';
import { Student } from '../entities/student.entity';
import { StudentService } from './student.service';


@Controller('student')
export class StudentController {

    constructor(private readonly studentService: StudentService) {}

    @Post('register')
    async register(@Body() studentData: Student) {
      const student = this.studentService.registerStudent(studentData);
      return { message: 'Student registered successfully', student };
    }
  
    @Post('login')
    async login(@Body() loginData: { email: string, password: string }) {
      const token = await this.studentService.login(loginData.email, loginData.password);
      return { token };
    }
  
}
