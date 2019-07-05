import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable, OneToMany } from 'typeorm';

export abstract class Knot {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    address: string;

    @Column()
    description: string;

    @Column()
    model: string;

    @Column()
    systemVersion: string;

    @Column()
    name: string;
}