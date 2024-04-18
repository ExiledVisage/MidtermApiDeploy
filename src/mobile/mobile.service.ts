import { Injectable } from '@nestjs/common';
import { Tuition } from 'src/entities/tuition.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MobileService {

    constructor(
        @InjectRepository(Tuition)
        private readonly tuitionRepository: Repository<Tuition>,
      ) {}
    
      async queryTuition(studentNo: string): Promise<any> {
        const tuition = await this.tuitionRepository.findOne({ where:{student: { studentNo: studentNo }} });
    
        if (!tuition) {
          return { error: 'Tuition information not found' };
        }
    
        return { tuitionTotal: tuition.tuitionTotal, balance: tuition.balance };
      }
      
}
