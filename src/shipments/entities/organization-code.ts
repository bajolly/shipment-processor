import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'code'})
export class OrganizationCode {
    @PrimaryGeneratedColumn()
    id: number;

    @Column( { unique : true })
    code: string;

}
