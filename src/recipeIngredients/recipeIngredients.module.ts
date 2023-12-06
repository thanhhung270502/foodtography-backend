import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RecipeIngredients } from './recipeIngredients.entity';
import { RecipeIngredientsController } from './recipeIngredients.controller';
import { RecipeIngredientsService } from './recipeIngredients.service';

@Module({
    imports: [TypeOrmModule.forFeature([RecipeIngredients])],
    controllers: [RecipeIngredientsController],
    providers: [RecipeIngredientsService],
})
export class RecipeIngredientsModule {}
