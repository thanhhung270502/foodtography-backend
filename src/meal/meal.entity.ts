import { User } from 'src/auth/user.entity';
import { Recipe } from 'src/recipe/recipe.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('meal')
export class Meal {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    userId: string;

    @Column()
    time: Date;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @ManyToOne(() => User, (user) => user.meals)
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToMany(() => Recipe, (recipe) => recipe.meals)
    @JoinTable({
        name: 'meal_recipes',
        joinColumn: {
            name: 'mealId',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'meal_recipes_mealId',
        },
        inverseJoinColumn: {
            name: 'recipeId',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'meal_recipes_recipeId',
        },
    })
    recipes: Recipe[];
}
