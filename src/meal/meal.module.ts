import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Meal } from './meal.entity';
import { MealController } from './meal.controller';
import { MealService } from './meal.service';

@Module({
    imports: [TypeOrmModule.forFeature([Meal])],
    controllers: [MealController],
    providers: [MealService],
})
export class MealModule {}
