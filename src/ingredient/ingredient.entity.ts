import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
