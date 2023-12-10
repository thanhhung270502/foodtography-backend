import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { RecipeModule } from './recipe/recipe.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { RecipeIngredientsModule } from './recipeIngredients/recipeIngredients.module';

@Module({
    imports: [
        AuthModule,
        RecipeModule,
        IngredientModule,
        RecipeIngredientsModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'monorail.proxy.rlwy.net',
            port: 14493,
            username: 'postgres',
            password: 'd1*G-FBeF4gB*aB5BDBdeFEee5aD546E',
            database: 'railway',
            autoLoadEntities: true,
            synchronize: true,
        }),
    ],
})
export class AppModule {}
