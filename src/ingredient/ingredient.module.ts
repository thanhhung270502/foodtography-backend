import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Ingredient } from './ingredient.entity';
import { IngredientController } from './ingredient.controller';
import { IngredientService } from './ingredient.service';

@Module({
    imports: [TypeOrmModule.forFeature([Ingredient])],
    controllers: [IngredientController],
    providers: [IngredientService],
})
export class IngredientModule {}
