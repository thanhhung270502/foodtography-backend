import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
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

    @Column()
    authorId: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;
}
