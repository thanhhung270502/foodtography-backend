import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class IngredientCredentialsDto {
    @IsString()
    name: string;

    @IsString()
    unit: string;
}
