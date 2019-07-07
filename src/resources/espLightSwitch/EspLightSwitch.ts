import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable, OneToMany } from 'typeorm';
import { Knot } from '../../abstracts/knot/Knot';
import { Room } from '../room/Room';

@Entity()
export class ESPLightSwitch extends Knot {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public description: string;

    @Column({ nullable: true })
    roomId: number;

    @ManyToOne(type => Room, room => room.lightSwitches)
    @JoinTable()
    public room: Room;

    public isActive: boolean;
}