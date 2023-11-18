import db from '../lib/db';
import { Table, Column, Model, HasMany, AutoIncrement, PrimaryKey } from 'sequelize-typescript';

@Table
export default class Ticket extends Model {
    @PrimaryKey
    @AutoIncrement  
    @Column
    id: number;
        
    @Column
    name: string;

    @Column
    tableNumber: number;

    @Column
    checkin: boolean;

    @Column
    couple: boolean;

    @Column
    couple1: boolean;

    @Column
    couple2: boolean;

    @Column
    photo: boolean;

    @Column
    gift: boolean;
}

db.addModels([Ticket]);