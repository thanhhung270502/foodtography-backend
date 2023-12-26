import { IsString, IsArray, IsBoolean } from 'class-validator';
import { Ingredient } from '../../ingredient/ingredient.entity';
export class RecipeCredentialsDto {
    @IsString()
    name: string;

    @IsString()
    image: string;

    @IsArray()
    ingredients: string[];

    @IsArray()
    quantities: number[];

    @IsString()
    instructions: string;

    @IsString()
    authorNote: string;

    @IsBoolean()
    isPublic: boolean;

    @IsString()
    authorId: string;
}
