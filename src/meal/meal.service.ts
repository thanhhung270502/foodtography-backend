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

@Injectable()
export class MealService {
    constructor(
        @InjectRepository(Meal)
        private mealsRepository: Repository<Meal>,
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

        return new ResponseObject(200, 'Found successfully', {
            meals: meals,
        });
    }

    async create(info): Promise<ResponseObject> {
        const { userId, recipes, time } = info;
        const meal = this.mealsRepository.create({
            userId,
            recipes,
            time: new Date(time),
            created_at: new Date(),
            updated_at: new Date(),
        });

        try {
            const saveMeal = await this.mealsRepository.save(meal);
            return new ResponseObject(200, 'Create new meal successfully', { saveMeal });
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}
