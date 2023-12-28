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

    @Column('uuid')
    authorId: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;
}
