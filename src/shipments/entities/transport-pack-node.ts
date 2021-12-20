import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { MassEnum } from "../shipments.constants";
import { Shipment } from "./shipment";

@Entity({ name: 'transport_pack_nodes' })
@Unique(['weight', 'weightUnit'])
export class TransportPackNode { 
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    weight: number;

    @Column({ name: 'weight_unit', type: "enum", enum: MassEnum })
    weightUnit: string;

    @ManyToOne(() => Shipment, shipment => shipment.nodes)
    shipment: Shipment;
}