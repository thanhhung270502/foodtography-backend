import { Recipe } from 'src/recipe/recipe.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Meal {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @Column({ type: 'json', default: [] })
    recipes: Recipe[];

    @Column()
    time: Date;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;
}
