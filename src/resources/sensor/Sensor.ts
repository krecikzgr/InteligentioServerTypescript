import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable, OneToMany} from 'typeorm';
import {Room} from '../room/Room';
import {SceneSetting} from '../sceneSetting/SceneSetting';

@Entity()
export class Sensor {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public description: string;

    @Column({ nullable: true })
    roomId: number;

    @ManyToOne(type => Room, room => room.sensors)
    @JoinTable()
    public room:Room;

    @OneToMany(type => SceneSetting, setting => setting.sensor)
    public settings: SceneSetting[];

    @Column()
    public isActive:boolean;
}