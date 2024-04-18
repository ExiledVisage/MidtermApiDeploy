import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tuition } from '../entities/tuition.entity';
import { Observable, from, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TuitionService {
  constructor(
    @InjectRepository(Tuition)
    private readonly tuitionRepository: Repository<Tuition>,
  ) {}

  create(tuition: Tuition): Observable<Tuition> {
    return from(this.tuitionRepository.save(tuition)).pipe(
      catchError((error) => throwError(error))
    );
  }
}
