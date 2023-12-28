import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { RecipeModule } from './recipe/recipe.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { RecipeIngredientsModule } from './recipeIngredients/recipeIngredients.module';
import { MealModule } from './meal/meal.module';
import { MealRecipesModule } from './mealRecipes/mealRecipes.module';

console.log(process.env.POSTGRES_HOST);

@Module({
    imports: [
        AuthModule,
        MealModule,
        RecipeModule,
        MealRecipesModule,
        IngredientModule,
        RecipeIngredientsModule,
        ConfigModule.forRoot({
            envFilePath: ['.env.development.local', '.env.development', '.env'],
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: +process.env.POSTGRES_PORT,
            username: process.env.POSTGRES_USERNAME,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DATABASE,
            autoLoadEntities: true,
            synchronize: true,
        }),
    ],
})
export class AppModule {}
