import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable} from 'typeorm';
import {Sensor} from '../sensor/Sensor';

@Entity()
export class Room {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public description: string;

    @OneToMany(type => Sensor, sensor => sensor.room, {
        eager: true
    })
    public sensors: Sensor[];


    //Calculated fields
    public isActive:boolean;
}
