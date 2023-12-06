import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RecipeIngredientsService } from './recipeIngredients.service';
import { RecipeIngredientsCredentialsDto } from './dto/recipeIngredients-credentials.dto';
import { RecipeIngredients } from './recipeIngredients.entity';
import { ResponseObject } from 'src/response/responseObject';

@Controller('auth')
export class RecipeIngredientsController {
    constructor(private ingredientService: RecipeIngredientsService) {}
}
