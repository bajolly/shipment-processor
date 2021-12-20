import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrganizationCode } from "./organization-code";

@Entity({ name: 'organizations' })
export class Organization { 
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'org_id', unique: true } )
    orgId: string;

    @OneToOne(() => OrganizationCode, {cascade : true})
    @JoinColumn()
    code: OrganizationCode;
}
