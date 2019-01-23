import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable} from 'typeorm';
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

    @Column({ nullable: true })
    roomId: number;

    @ManyToOne(type => Room, room => room.sensors)
    @JoinTable()
    public room:Room;
}