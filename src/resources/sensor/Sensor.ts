import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {Room} from '../room/Room';

@Entity()
export class Sensor {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public description: string;

    @Column()
    public isActive:Boolean;

    @ManyToOne(type => Room, room => room.sensors)
    public room:Room;
}