import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RecipeIngredients {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    recipeId: string;

    @Column('uuid')
    ingredientId: string;

    @Column()
    quantity: number;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;
}
