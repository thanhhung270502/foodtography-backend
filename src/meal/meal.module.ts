import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Meal } from './meal.entity';
import { MealController } from './meal.controller';
import { MealService } from './meal.service';
import { MealRecipes } from 'src/mealRecipes/mealRecipes.entity';
import { Recipe } from 'src/recipe/recipe.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Meal, MealRecipes, Recipe])],
    controllers: [MealController],
    providers: [MealService],
})
export class MealModule {}
