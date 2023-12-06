import { RecipeCredentialsDto } from './dto/recipe-credentials.dto';
import { Recipe } from './recipe.entity';
import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseObject } from 'src/response/responseObject';
import { ItemToUpdate } from './itemToUpdate.entity';

@Injectable()
export class RecipeService {
    constructor(
        @InjectRepository(Recipe)
        private recipesRepository: Repository<Recipe>,
    ) {}

    async getAllRecipes(): Promise<Recipe[]> {
        const allRecipes = await this.recipesRepository.find();

        if (!allRecipes) throw new NotFoundException(`Recipes not found`);

        return allRecipes;
    }

    async addRecipe(recipeCredentialsDto: RecipeCredentialsDto): Promise<void> {
        const { recipeName, recipeImage, ingredients, instructions, authorNote, isPublic, authorId } =
            recipeCredentialsDto;

        const recipe = this.recipesRepository.create({
            recipeName,
            recipeImage,
            ingredients,
            instructions,
            authorNote,
            isPublic,
            authorId,
        });

        try {
            await this.recipesRepository.save(recipe);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Recipe already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async getRecipeByID(recipe_id: string): Promise<Recipe> {
        const recipe = await this.recipesRepository.findOne({
            where: {
                id: recipe_id,
            },
        });

        if (!recipe) {
            throw new NotFoundException(`Recipe with id ${recipe_id} not found`);
        }

        return recipe;
    }

    async update(info: Recipe, recipe_id: string): Promise<ResponseObject> {
        const recipe = await this.recipesRepository.findOne({
            where: {
                id: recipe_id,
            },
        });

        if (!recipe) {
            throw new NotFoundException(`Recipe with id ${recipe_id} not found`);
        }

        var { recipeName, recipeImage, ingredients, instructions, authorNote, isPublic } = info;

        if (!recipeName) recipeName = recipe.recipeName;
        if (!recipeImage) recipeImage = recipe.recipeImage;
        if (!ingredients) ingredients = recipe.ingredients;
        if (!instructions) instructions = recipe.instructions;
        if (!authorNote) authorNote = recipe.authorNote;
        if (!isPublic) isPublic = recipe.isPublic;

        const newRecipe = await this.recipesRepository.update(
            { id: recipe_id },
            {
                recipeName,
                recipeImage,
                ingredients,
                instructions,
                authorNote,
                isPublic,
            },
        );

        return new ResponseObject(200, 'Update recipe successfully', info);
    }

    async delete(recipe_id: string): Promise<ResponseObject> {
        const recipe = await this.recipesRepository.findOne({
            where: {
                id: recipe_id,
            },
        });

        if (!recipe) {
            return new ResponseObject(404, `Recipe with id ${recipe_id} not found`, {});
        }

        await this.recipesRepository.delete({ id: recipe_id });
        return new ResponseObject(200, 'Delete recipe successfully', {});
    }

    async updateOfUser(
        recipe_id: string,
        status: string,
        offset: number,
        itemToUpdate: ItemToUpdate,
    ): Promise<ResponseObject> {
        const recipe = await this.recipesRepository.findOne({
            where: {
                id: recipe_id,
            },
        });

        if (!recipe) {
            throw new NotFoundException(`Recipe with id ${recipe_id} not found`);
        }

        const newRecipe = await this.recipesRepository.update(
            { id: recipe_id },
            {
                recipeName: itemToUpdate.recipeName,
                // Chua hieu phan nay
            },
        );

        return new ResponseObject(200, 'Update recipe successfully', newRecipe);
    }
}
