import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MealRecipes } from './mealRecipes.entity';
import { MealRecipesController } from './mealRecipes.controller';
import { MealRecipesService } from './mealRecipes.service';
import { Meal } from 'src/meal/meal.entity';

@Module({
    imports: [TypeOrmModule.forFeature([MealRecipes, Meal])],
    controllers: [MealRecipesController],
    providers: [MealRecipesService],
})
export class MealRecipesModule {}
