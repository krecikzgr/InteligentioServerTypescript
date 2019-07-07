import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable } from 'typeorm';
import { ESPLightSwitch } from '../espLightSwitch/EspLightSwitch';

@Entity()
export class Room {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public description: string;

    @OneToMany(type => ESPLightSwitch, lightSwitch => lightSwitch.room, {
        eager: true
    })
    public lightSwitches: ESPLightSwitch[];

    //Calculated fields
    public isActive: boolean;
}
