import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientCredentialsDto } from './dto/ingredient-credentials.dto';
import { Ingredient } from './ingredient.entity';
import { ResponseObject } from 'src/response/responseObject';

@Controller('auth')
export class IngredientController {
    constructor(private ingredientService: IngredientService) {}
}
