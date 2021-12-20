import { Logger } from '@nestjs/common';
import { Injectable, NotFoundException, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NodesDto } from '../dto/nodes.dto';
import { ShipmentDto } from '../dto/shipment.dto';
import { OrganizationCode } from '../entities/organization-code';
import { Shipment } from '../entities/shipment';
import { TransportPackNode } from '../entities/transport-pack-node';
import { OrganizationCodeService } from '../organization.code.service';

@Injectable({ scope: Scope.DEFAULT })
export class ShipmentService extends OrganizationCodeService {
    constructor(
        @InjectRepository(Shipment)
        private readonly shipmentRepository: Repository<Shipment>,
        @InjectRepository(OrganizationCode)
        private organizationCodeRepository: Repository<OrganizationCode>,
        @InjectRepository(TransportPackNode)
        private readonly transportPackNodeRepository: Repository<TransportPackNode>,
    ) {
        super();
    }
   
    private readonly logger: Logger = new Logger(ShipmentService.name);
    
    async findOne(referenceId: string,) {
        const shipment = await this.shipmentRepository.findOne(
            {
                where: { referenceId: referenceId },

                relations: ['organizations', 'nodes'],
            }
        );

        if (!shipment) {
            throw new NotFoundException(`Shipment #${referenceId} not found`);
        }
        return shipment;
    }

    async create(shipmentDto: ShipmentDto)
    {

        //to keep from throwing error.  
        //TODO implement an update method
        const existingShipment = await this.shipmentRepository.findOne(
            {
                where: { referenceId: shipmentDto.referenceId },

                relations: ['organizations', 'nodes'],
            }
        );

        if (existingShipment) {
            this.logger.warn(`Shipment ${shipmentDto.referenceId} already exists returning existing instance`)
            return existingShipment;
        }
        
        const codes = await Promise.all(
            shipmentDto.organizations.map(code => this.preloadOrganizationCodeByCode(code, this.organizationCodeRepository))
        )

        const trackingNodes = await Promise.all(
            shipmentDto.transportPacks.nodes.map(nodesDto => this.preloadNodeByWeightAndUnits(nodesDto))
        )

        const shipment = this.shipmentRepository.create({
            referenceId: shipmentDto.referenceId,
            estimatedTimeArrival: shipmentDto.estimatedTimeArrival,
            organizations: codes,
            nodes: trackingNodes
        })

        return this.shipmentRepository.save(shipment);
    }




    private async preloadNodeByWeightAndUnits(nodesDto: NodesDto): Promise<TransportPackNode> {
        const trackingNode = await this.transportPackNodeRepository.findOne({
            where: {
                weight: nodesDto.totalWeight.weight,
                weightUnit: nodesDto.totalWeight.unit,
            }
        });
        
        if (trackingNode) {
            return trackingNode;
        }
        
        return this.transportPackNodeRepository.create({
            weight: nodesDto.totalWeight.weight,
            weightUnit: nodesDto.totalWeight.unit,
        });
    }    
}