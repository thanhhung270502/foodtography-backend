import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('recipe_ingredients')
export class RecipeIngredients {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @PrimaryColumn('uuid')
    recipeId: string;

    @PrimaryColumn('uuid')
    ingredientId: string;

    @Column()
    quantity: number;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;
}
