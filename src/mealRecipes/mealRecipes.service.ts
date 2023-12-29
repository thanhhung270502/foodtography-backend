import { MealRecipesCredentialsDto } from './dto/mealRecipes-credentials.dto';
import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MealRecipes } from './mealRecipes.entity';
import { Repository } from 'typeorm';
import { ResponseObject } from 'src/response/responseObject';
import { Meal } from 'src/meal/meal.entity';

@Injectable()
export class MealRecipesService {
    constructor(
        @InjectRepository(MealRecipes)
        private mealRecipesRepository: Repository<MealRecipes>,

        @InjectRepository(Meal)
        private mealsRepository: Repository<Meal>,
    ) {}

    async getAllMealRecipes(): Promise<MealRecipes[]> {
        const allMealRecipes = await this.mealRecipesRepository.find();

        if (!allMealRecipes) throw new NotFoundException(`Ingredients not found`);

        return allMealRecipes;
    }

    async create(body: MealRecipesCredentialsDto): Promise<ResponseObject> {
        let { recipeId, mealId, userId, time } = body;
        Logger.log(body);

        if (!mealId) {
            const meal = this.mealsRepository.create({
                userId,
                time: new Date(time),
                created_at: new Date(),
                updated_at: new Date(),
            });

            try {
                const saveMeal = await this.mealsRepository.save(meal);
                mealId = saveMeal.id;
            } catch (error) {
                throw new InternalServerErrorException();
            }
        } else {
            const meal = await this.mealsRepository.findOne({
                where: {
                    id: mealId,
                },
            });

            if (!meal) {
                return new ResponseObject(404, `Meal with id ${mealId} not found`, {});
            } else {
                Logger.log(meal);
            }
        }

        // Check conflict
        const findMealRecipe = await this.mealRecipesRepository.findOne({
            where: {
                recipeId,
                mealId,
            },
        });
        if (findMealRecipe) {
            return new ResponseObject(409, 'MealRecipe already exists', {});
        }

        const mealRecipe = this.mealRecipesRepository.create({
            recipeId,
            mealId,
        });

        Logger.log(mealRecipe);

        try {
            const saveMealRecipe = await this.mealRecipesRepository.save(mealRecipe);
            return new ResponseObject(200, 'Create successfully', saveMealRecipe);
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async delete(id: string): Promise<ResponseObject> {
        const mealRecipe = await this.mealRecipesRepository.findOne({
            where: {
                id,
            },
        });

        if (!mealRecipe) {
            return new ResponseObject(404, `Meal-recipe with id = ${id} not found`, {});
        }

        await this.mealRecipesRepository.delete({ id });
        return new ResponseObject(200, 'Delete meal-recipe successfully', {});
    }
}
