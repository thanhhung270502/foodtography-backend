import { MealCredentialsDto } from './dto/meal-credentials.dto';
import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Meal } from './meal.entity';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { ResponseObject } from 'src/response/responseObject';
import { Recipe } from 'src/recipe/recipe.entity';
import { getEndTime, getStartTime } from './meal.helper';
import { MealRecipes } from 'src/mealRecipes/mealRecipes.entity';

@Injectable()
export class MealService {
    constructor(
        @InjectRepository(Meal)
        private mealsRepository: Repository<Meal>,

        @InjectRepository(MealRecipes)
        private mealRecipesRepository: Repository<MealRecipes>,
    ) {}

    async getAllMeals(): Promise<Meal[]> {
        const meal = await this.mealsRepository.find();
        return meal;
    }

    async findAll() {
        return await this.mealsRepository.find({
            relations: {
                user: true,
                recipes: true,
            },
        });
    }

    async create(dto: MealCredentialsDto) {
        const { userId, time, recipeIds } = dto;

        const meal = this.mealsRepository.create({
            userId,
            time,
            created_at: new Date(),
            updated_at: new Date(),
        });

        // meal.recipes = recipeIds.map((id) => ({ ...new Recipe(), id }));

        return await this.mealsRepository.save(meal);
    }

    async getAllMealsByWeek(userId: string, time: string): Promise<ResponseObject> {
        const startTime: Date = new Date(getStartTime(time));
        const endTime: Date = new Date(getEndTime(time));

        const meals = await this.mealsRepository.find({
            relations: {
                user: true,
                recipes: true,
            },
            where: {
                time: Between(startTime, endTime),
                userId,
            },
        });

        return new ResponseObject(200, 'Found successfully', meals);
    }
}
