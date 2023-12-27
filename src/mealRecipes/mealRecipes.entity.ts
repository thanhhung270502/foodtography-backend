import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MealRecipes {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    mealId: string;

    @Column()
    recipeId: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;
}
