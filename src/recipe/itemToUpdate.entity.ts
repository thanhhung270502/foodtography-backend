import { Column, PrimaryGeneratedColumn } from "typeorm";

export class ItemToUpdate {
    @PrimaryGeneratedColumn('uuid')
    recipe_id: string;

    @Column()
    recipeName: string;

    @Column()
    recipeInfo: string;

    @Column()
    recipeServing: string;
}