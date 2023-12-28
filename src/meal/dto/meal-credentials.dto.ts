import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class MealCredentialsDto {
    userId: string;

    time: Date;

    recipeIds: string[];
}
