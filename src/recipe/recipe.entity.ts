import { User } from 'src/auth/user.entity';
import { Meal } from 'src/meal/meal.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

    @ManyToOne(() => User, (user) => user.recipes)
    @JoinColumn({ name: 'authorId' })
    user: User;

    @ManyToMany(() => Meal, (meal) => meal.recipes)
    meals: Meal[];
}
