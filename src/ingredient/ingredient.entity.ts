import { Column, PrimaryGeneratedColumn } from 'typeorm';
export class Ingredient {
    @PrimaryGeneratedColumn('uuid')
    index: number;

    @Column()
    ingredientName: string;

    @Column()
    quantity: number;

    @Column()
    unit: string;
}