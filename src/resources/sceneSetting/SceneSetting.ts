import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable } from 'typeorm';
import { Scene } from '../scene/Scene';
import { EspLightSwitch } from '../espLightSwitch/EspLightSwitch';

@Entity()
export class SceneSetting {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public isActive: boolean;

    @Column()
    public sensorId: number;

    @ManyToOne(type => Scene, scene => scene.settings)
    @JoinTable()
    public scene: Scene;

    @ManyToOne(type => EspLightSwitch, lightSwitch => lightSwitch.settings)
    @JoinTable()
    public lightSwitch: Promise<EspLightSwitch>;
}