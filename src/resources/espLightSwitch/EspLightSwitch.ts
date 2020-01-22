import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable, OneToMany } from 'typeorm';
import { Knot } from '../../abstracts/knot/Knot';
import { Room } from '../room/Room';
import { SceneSetting } from '../sceneSetting/SceneSetting';

@Entity()
export class EspLightSwitch extends Knot {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public description: string;

    @Column({ nullable: true })
    roomId: number;

    @Column()
    public remoteId: number;

    @ManyToOne(type => Room, room => room.lightSwitches)
    @JoinTable()
    public room: Room;

    @OneToMany(type => SceneSetting, setting => setting.lightSwitch, {
        eager: true
    })

    public settings: SceneSetting[];

    public isActive: boolean;
}