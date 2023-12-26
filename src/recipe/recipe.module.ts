import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeIngredients } from 'src/recipeIngredients/recipeIngredients.entity';
@Module({
    imports: [TypeOrmModule.forFeature([Recipe, RecipeIngredients])],
    controllers: [RecipeController],
    providers: [RecipeService],
    exports: [RecipeService],
})
export class RecipeModule {}
