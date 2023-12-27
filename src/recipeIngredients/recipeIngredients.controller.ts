import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RecipeIngredientsService } from './recipeIngredients.service';
import { RecipeIngredientsCredentialsDto } from './dto/recipeIngredients-credentials.dto';
import { RecipeIngredients } from './recipeIngredients.entity';
import { ResponseObject } from 'src/response/responseObject';

@Controller('recipe-ingredients')
export class RecipeIngredientsController {
    constructor(private recipeIngredientsService: RecipeIngredientsService) {}

    @Get('/')
    index(): Promise<RecipeIngredients[]> {
        return this.recipeIngredientsService.getAllRecipeIngredients();
    }

    // @Post('/')
    // create(@Body() body: any): Promise<ResponseObject> {
    //     return;
    // }
}
