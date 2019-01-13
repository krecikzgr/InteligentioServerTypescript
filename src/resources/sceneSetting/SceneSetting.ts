import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {Scene} from '../scene/Scene';

@Entity()
export class SceneSetting {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public isActive: boolean;

    @ManyToOne(type => Scene, scene => scene.settings)
    public scene: Scene;
}