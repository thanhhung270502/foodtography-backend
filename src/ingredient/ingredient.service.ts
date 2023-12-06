import { IngredientCredentialsDto } from './dto/ingredient-credentials.dto';
import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from './ingredient.entity';
import { Repository } from 'typeorm';
import { ResponseObject } from 'src/response/responseObject';

@Injectable()
export class IngredientService {
    constructor(
        @InjectRepository(Ingredient)
        private ingredientsRepository: Repository<Ingredient>,
    ) {}
}
