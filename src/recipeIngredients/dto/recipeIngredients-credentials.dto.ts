import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class RecipeIngredientsCredentialsDto {
    @IsString()
    recipeId: string;

    @IsString()
    ingredient;
}
