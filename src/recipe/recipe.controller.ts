import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeCredentialsDto } from './dto/recipe-credentials.dto';
import { Recipe } from './recipe.entity';
import { ResponseObject } from 'src/response/responseObject';
import { ItemToUpdate } from './itemToUpdate.entity';

@Controller('recipes')
export class RecipeController {
    constructor(private recipeService: RecipeService) {}

    @Get('/')
    getAllRecipes(): Promise<Recipe[]> {
        return this.recipeService.getAllRecipes();
    }

    @Post('/')
    addRecipe(@Body() recipeCredentialsDto: RecipeCredentialsDto): Promise<void> {
        return this.recipeService.addRecipe(recipeCredentialsDto);
    }

    @Get('/:id')
    getRecipeByID(@Param('id') id: string): Promise<Recipe> {
        return this.recipeService.getRecipeByID(id);
    }

    @Put('/:id')
    update(@Body() info: Recipe, @Param('id') id: string): Promise<ResponseObject> {
        return this.recipeService.update(info, id);
    }

    @Delete('/:id')
    delete(@Param('id') id: string): Promise<ResponseObject> {
        return this.recipeService.delete(id);
    }

    // @Put('/:id/share')
    // updateOfUser(
    //     @Param('id') id: string,
    //     @Query('status') status: string,
    //     @Query('offset') offset: number,
    //     @Query('itemToUpdate') itemToUpdate: ItemToUpdate,
    // ): Promise<ResponseObject> {
    //     return this.recipeService.updateOfUser(id, status, offset, itemToUpdate);
    // }
}
