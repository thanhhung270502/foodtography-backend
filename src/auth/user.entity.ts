import { Meal } from 'src/meal/meal.entity';
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    avatar: string;

    @Column()
    role: number;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @OneToMany(() => Meal, (meal) => meal.user)
    meals: Meal[];
}
