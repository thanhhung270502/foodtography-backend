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
import { getEndTime, getRandomRange, getStartTime } from './meal.helper';
import { MealRecipes } from 'src/mealRecipes/mealRecipes.entity';
import { CreateMealPlanningCredentialsDto } from './dto/createPlanning-credentials.dto';
import { delay } from 'rxjs';

@Injectable()
export class MealService {
    constructor(
        @InjectRepository(Meal)
        private mealsRepository: Repository<Meal>,

        @InjectRepository(MealRecipes)
        private mealRecipesRepository: Repository<MealRecipes>,

        @InjectRepository(Recipe)
        private recipesRepository: Repository<Recipe>,
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

    async createAllWeek(dto: CreateMealPlanningCredentialsDto): Promise<ResponseObject> {
        const { userId, times } = dto;
        // const startTime: Date = new Date(getStartTime(time));
        const recipes = await this.recipesRepository.find();

        if (recipes.length === 0) {
            return new ResponseObject(400, 'No recipes found', {});
        }

        const promises = times.map(async (time) => {
            Logger.log(time);
            const meal = this.mealsRepository.create({
                userId,
                time,
                created_at: new Date(),
                updated_at: new Date(),
            });

            try {
                const saveMeal = await this.mealsRepository.save(meal);

                const randomNumber = getRandomRange(0, recipes.length - 1);

                Logger.log(randomNumber);

                const mealRecipe = this.mealRecipesRepository.create({
                    recipeId: recipes[randomNumber].id,
                    mealId: saveMeal.id,
                });

                const saveMealRecipe = await this.mealRecipesRepository.save(mealRecipe);
                Logger.log(saveMealRecipe);
            } catch (err) {
                return new ResponseObject(500, 'Internal Server Error', err);
            }
        });

        await Promise.all(promises);

        // for (const time of times) {
        //     Logger.log(time);
        //     const meal = this.mealsRepository.create({
        //         userId,
        //         time,
        //         created_at: new Date(),
        //         updated_at: new Date(),
        //     });

        //     try {
        //         const saveMeal = await this.mealsRepository.save(meal);

        //         const randomNumber = getRandomRange(0, recipes.length);

        //         const mealRecipe = this.mealRecipesRepository.create({
        //             recipeId: recipes[randomNumber].id,
        //             mealId: saveMeal.id,
        //         });

        //         const saveMealRecipe = await this.mealRecipesRepository.save(mealRecipe);
        //         Logger.log(saveMealRecipe);

        //         await new Promise((resolve) => setTimeout(resolve, 5000));
        //     } catch (err) {
        //         return new ResponseObject(500, 'Internal Server Error', err);
        //     }
        // }
        return new ResponseObject(200, 'Start my planning successfully', {});
    }
}
