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
import { Repository } from 'typeorm';
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

    async getAllMealsByWeek(userId: string, time: string): Promise<ResponseObject> {
        Logger.log(getStartTime(time));

        const startTime = getStartTime(time);
        const endTime = getEndTime(time);
        const meals = await this.mealsRepository
            .createQueryBuilder('meal')
            .where('meal.time >= :startTime', { startTime })
            .andWhere('meal.time <= :endTime', { endTime })
            .andWhere('meal.userId = :userId', { userId })
            .getMany();

        // const meals = thi

        let array = [];
        for (let i = 0; i < meals.length; i++) {
            let mealRecipes = await this.mealRecipesRepository.find({
                where: {
                    mealId: meals[i].id,
                },
            });
            array.push({
                meal: meals[i],
                mealRecipes,
            });
        }

        return new ResponseObject(200, 'Found successfully', array);
    }

    async create(info: any): Promise<ResponseObject> {
        const { userId, time, recipeIds } = info;
        const meal = this.mealsRepository.create({
            userId,
            time: new Date(time),
            created_at: new Date(),
            updated_at: new Date(),
        });

        try {
            const saveMeal = await this.mealsRepository.save(meal);

            for (let i = 0; i < recipeIds.length; i++) {
                let mealRecipe = this.mealRecipesRepository.create({
                    mealId: saveMeal.id,
                    recipeId: recipeIds[i],
                });

                try {
                    let saveMealRecipe = await this.mealRecipesRepository.save(mealRecipe);
                } catch (error) {
                    throw new InternalServerErrorException();
                }
            }

            return new ResponseObject(200, 'Create new meal successfully', { saveMeal });
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async getAllMeals(): Promise<Meal[]> {
        const meal = await this.mealsRepository.find();
        return meal;
    }
}
