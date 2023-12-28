import { Recipe } from 'src/recipe/recipe.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
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
}
