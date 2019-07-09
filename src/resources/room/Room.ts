import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable } from 'typeorm';
import { EspLightSwitch } from '../espLightSwitch/EspLightSwitch';

@Entity()
export class Room {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public description: string;

    @OneToMany(type => EspLightSwitch, lightSwitch => lightSwitch.room, {
        eager: true
    })
    public lightSwitches: EspLightSwitch[];

    //Calculated fields
    public isActive: boolean;
}
