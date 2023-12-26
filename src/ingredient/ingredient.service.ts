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

    async getAllIngredients(): Promise<Ingredient[]> {
        const allIngredients = await this.ingredientsRepository.find();

        if (!allIngredients) throw new NotFoundException(`Ingredients not found`);

        return allIngredients;
    }

    async addNewIngredient(ingredientCredentialsDto: IngredientCredentialsDto): Promise<ResponseObject> {
        const ingredient = this.ingredientsRepository.create({
            name: ingredientCredentialsDto.name,
            unit: ingredientCredentialsDto.unit,
            created_at: new Date(),
            updated_at: new Date(),
        });

        try {
            const savedIngredient = await this.ingredientsRepository.save(ingredient);

            return new ResponseObject(200, 'Created successfully', { savedIngredient });
        } catch (err) {
            return new ResponseObject(500, 'Internal Server Error', err);
        }
    }
}
