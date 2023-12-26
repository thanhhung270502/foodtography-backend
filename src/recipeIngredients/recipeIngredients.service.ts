import { RecipeIngredientsCredentialsDto } from './dto/recipeIngredients-credentials.dto';
import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeIngredients } from './recipeIngredients.entity';
import { Repository } from 'typeorm';
import { ResponseObject } from 'src/response/responseObject';

@Injectable()
export class RecipeIngredientsService {
    constructor(
        @InjectRepository(RecipeIngredients)
        private recipeIngredientsRepository: Repository<RecipeIngredients>,
    ) {}

    async getAllRecipeIngredients(): Promise<RecipeIngredients[]> {
        const allRecipeIngredients = await this.recipeIngredientsRepository.find();

        if (!allRecipeIngredients) throw new NotFoundException(`Ingredients not found`);

        return allRecipeIngredients;
    }
}
