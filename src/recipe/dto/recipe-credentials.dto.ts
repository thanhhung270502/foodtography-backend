import { IsString, IsArray, IsBoolean } from 'class-validator';
import { Ingredient } from '../../ingredient/ingredient.entity';
export class RecipeCredentialsDto {
    @IsString()
    recipeName: string;

    @IsString()
    recipeImage: string;

    @IsArray()
    ingredients: Ingredient[];

    @IsString()
    instructions: string;

    @IsString()
    authorNote: string;

    @IsBoolean()
    isPublic: boolean;

    @IsString()
    authorId: string;
}
