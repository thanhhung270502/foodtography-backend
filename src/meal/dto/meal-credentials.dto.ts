import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class MealCredentialsDto {
    created_at: Date;
    updated_at: Date;
}
