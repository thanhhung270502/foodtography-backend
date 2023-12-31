import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientCredentialsDto } from './dto/ingredient-credentials.dto';
import { Ingredient } from './ingredient.entity';
import { ResponseObject } from 'src/response/responseObject';

@Controller('ingredients')
export class IngredientController {
    constructor(private ingredientService: IngredientService) {}

    @Get('/')
    index(): Promise<Ingredient[]> {
        return this.ingredientService.getAllIngredients();
    }

    @Post('/')
    create(@Body() ingredientCredentialsDto: IngredientCredentialsDto): Promise<ResponseObject> {
        return this.ingredientService.addNewIngredient(ingredientCredentialsDto);
    }

    //@Delete('/:id')
    //delete(@Param('id') id: string): Promise<ResponseObject> {
    //    return this.ingredientService.deleteIngredient(id);
    //}
}
