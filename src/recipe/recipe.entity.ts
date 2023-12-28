import { Meal } from 'src/meal/meal.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('recipe')
export class Recipe {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    image: string;

    @Column()
    instructions: string;

    @Column()
    authorNote: string;

    @Column()
    isPublic: boolean;

    @Column('uuid')
    authorId: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @ManyToMany(() => Meal, (meal) => meal.recipes)
    meals: Meal[];
}
