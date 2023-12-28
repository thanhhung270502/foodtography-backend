import { Meal } from 'src/meal/meal.entity';
import { Recipe } from 'src/recipe/recipe.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('meal_recipes')
export class MealRecipes {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @PrimaryColumn('uuid')
    mealId: string;

    @PrimaryColumn('uuid')
    recipeId: string;

    // @Column()
    // created_at: Date;

    // @Column()
    // updated_at: Date;

    // @ManyToOne(() => Meal, (meal) => meal.recipes, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    // @JoinColumn([{ name: 'mealId', referencedColumnName: 'id' }])
    // meals: Meal[];

    // @ManyToOne(() => Recipe, (recipe) => recipe.meals, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    // @JoinColumn([{ name: 'recipeId', referencedColumnName: 'id' }])
    // recipes: Recipe[];
}
