import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable} from 'typeorm';
import {Scene} from '../scene/Scene';
import {Sensor} from '../sensor/Sensor';

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

    @ManyToOne(type => Sensor, sensor => sensor.settings)
    @JoinTable()
    public sensor:Promise<Sensor>;
}