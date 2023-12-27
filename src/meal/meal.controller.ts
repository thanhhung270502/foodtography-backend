import { Body, Controller, Delete, Get, Logger, Param, Post, Put } from '@nestjs/common';
import { MealService } from './meal.service';
import { MealCredentialsDto } from './dto/meal-credentials.dto';
import { Meal } from './meal.entity';
import { ResponseObject } from 'src/response/responseObject';
import { Recipe } from 'src/recipe/recipe.entity';

@Controller('meals')
export class MealController {
    constructor(private mealService: MealService) {}

    @Get('/:userId/:time')
    getAllMealsByWeek(@Param('userId') userId: string, @Param('time') time: string): Promise<ResponseObject> {
        Logger.log(userId, time);
        return this.mealService.getAllMealsByWeek(userId, time);
    }

    @Post('/')
    create(@Body() body: any): Promise<ResponseObject> {
        Logger.log(body);
        return this.mealService.create(body);
    }
}
