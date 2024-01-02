import { RecipeCredentialsDto } from './dto/recipe-credentials.dto';
import { Recipe } from './recipe.entity';
import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseObject } from 'src/response/responseObject';
import { ItemToUpdate } from './itemToUpdate.entity';
import { RecipeIngredients } from 'src/recipeIngredients/recipeIngredients.entity';

@Injectable()
export class RecipeService {
    constructor(
        @InjectRepository(Recipe)
        private recipesRepository: Repository<Recipe>,

        @InjectRepository(RecipeIngredients)
        private recipeIngredientsRepository: Repository<RecipeIngredients>,
    ) {}

    async getAllRecipes(): Promise<Recipe[]> {
        const allRecipes = await this.recipesRepository.find();

        if (!allRecipes) throw new NotFoundException(`Recipes not found`);

        return allRecipes;
    }

    async addRecipe(recipeCredentialsDto: RecipeCredentialsDto): Promise<ResponseObject> {
        const { name, image, instructions, authorNote, isPublic, authorId, ingredients, quantities } =
            recipeCredentialsDto;

        if (ingredients.length !== quantities.length) {
            return new ResponseObject(400, 'Create recipe unsuccessfully', {});
        }

        // for (let i = 0; i < )/

        const recipe = this.recipesRepository.create({
            name,
            image,
            instructions,
            authorNote,
            isPublic,
            authorId,
            created_at: new Date(),
            updated_at: new Date(),
        });

        try {
            const saveRecipe = await this.recipesRepository.save(recipe);
            for (let i = 0; i < ingredients.length; i++) {
                let recipeIngredient = this.recipeIngredientsRepository.create({
                    recipeId: saveRecipe.id,
                    ingredientId: ingredients[i],
                    quantity: quantities[i],
                    created_at: new Date(),
                    updated_at: new Date(),
                });

                try {
                    let saveRecipeIngredient = await this.recipeIngredientsRepository.save(recipeIngredient);
                } catch (error) {
                    throw new InternalServerErrorException();
                }
            }
            return new ResponseObject(200, 'Create successfully', {});
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

        var { name, image, instructions, authorNote, isPublic } = info;

        if (!name) name = recipe.name;
        if (!image) image = recipe.image;
        if (!instructions) instructions = recipe.instructions;
        if (!authorNote) authorNote = recipe.authorNote;
        if (!isPublic) isPublic = recipe.isPublic;

        const newRecipe = await this.recipesRepository.update(
            { id: recipe_id },
            {
                name,
                image,
                instructions,
                authorNote,
                isPublic,
                updated_at: new Date(),
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
                name: itemToUpdate.name,
                // Chua hieu phan nay
            },
        );

        return new ResponseObject(200, 'Update recipe successfully', newRecipe);
    }

    async getByAuthorId(author_id: string): Promise<Recipe[]> {
        const recipes = await this.recipesRepository.find({
            where: {
                authorId: author_id,
            },
        });
        return recipes;
    }
}
