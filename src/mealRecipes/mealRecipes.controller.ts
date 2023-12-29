import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MealRecipesService } from './mealRecipes.service';
import { MealRecipesCredentialsDto } from './dto/mealRecipes-credentials.dto';
import { MealRecipes } from './mealRecipes.entity';
import { ResponseObject } from 'src/response/responseObject';
import { MealCredentialsDto } from 'src/meal/dto/meal-credentials.dto';

@Controller('meal-recipes')
export class MealRecipesController {
    constructor(private mealRecipesService: MealRecipesService) {}

    @Get('/')
    index(): Promise<MealRecipes[]> {
        return this.mealRecipesService.getAllMealRecipes();
    }

    @Post('/')
    create(@Body() body: MealRecipesCredentialsDto): Promise<ResponseObject> {
        return this.mealRecipesService.create(body);
    }

    @Delete('/')
    delete(@Param('id') id: string): Promise<ResponseObject> {
        return this.mealRecipesService.delete(id);
    }
}
