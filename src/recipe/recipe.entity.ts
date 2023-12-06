import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Ingredient } from '../ingredient/ingredient.entity';

@Entity()
export class Recipe {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    recipeName: string;

    @Column()
    recipeImage: string;

    @Column({ type: 'json', default: [] })
    ingredients: Ingredient[];

    @Column()
    instructions: string;

    @Column()
    authorNote: string;

    @Column()
    isPublic: boolean;

    @Column()
    authorId: string;
}
