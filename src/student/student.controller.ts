import { Controller, Post, Body} from '@nestjs/common';
import { Student } from '../entities/student.entity';
import { StudentService } from './student.service';


@Controller('student')
export class StudentController {

    constructor(private readonly studentService: StudentService) {}

    @Post()
    async create(@Body() student: Student) {
      return this.studentService.create(student);
    }
  
}
