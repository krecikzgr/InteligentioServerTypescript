import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {SceneSetting} from '../sceneSetting/SceneSetting';

@Entity()
export class Scene {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public description: string;

    @OneToMany(type => SceneSetting, sceneSetting => sceneSetting.scene)
    public settings: SceneSetting[];
}