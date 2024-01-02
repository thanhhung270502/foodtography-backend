import { User } from 'src/auth/user.entity';
import { Recipe } from 'src/recipe/recipe.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ingredient {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    image: string;

    @Column()
    description: string;

    @Column()
    cookingTips: string;

    @Column()
    unit: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @ManyToMany(() => Recipe, (recipe) => recipe.ingredients)
    recipes: Recipe[];
}
