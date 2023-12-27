import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class MealRecipesCredentialsDto {
    // @IsString()
    recipeId: string;

    // @IsString()
    mealId: string;

    userId: string;
}
