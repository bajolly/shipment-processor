import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrganizationCode } from "./organization-code";
import { TransportPackNode } from "./transport-pack-node";

@Entity({ name: 'shipments' })
export class Shipment { 
    @PrimaryGeneratedColumn()
    id: number;

    @Column( { name: 'reference_id', unique : true })
    referenceId: string;

    @Column({ name: 'estimated_time_arrival', nullable: true })
     estimatedTimeArrival: Date;

    @JoinTable()
    @ManyToMany(() => OrganizationCode,
        (code) => code.code, {
        cascade: true,
    })
    organizations: OrganizationCode[];

    @JoinTable()
    @ManyToMany(() => TransportPackNode, node => node.shipment, { cascade: true, })
    nodes: TransportPackNode[];
}
