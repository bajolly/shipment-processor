import { Module } from '@nestjs/common';
import { ShipmentController } from './shipment/shipment.controller';
import { ShipmentService } from './shipment/shipment.service';
import { OrganizationController } from './organization/organization.controller';
import { OrganizationService } from './organization/organization.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipment } from './entities/shipment';
import { Organization } from './entities/organization';
import { OrganizationCode } from './entities/organization-code';
import { TransportPackNode } from './entities/transport-pack-node';

@Module({
    imports: [TypeOrmModule.forFeature([Shipment, Organization, OrganizationCode, TransportPackNode])],
    controllers: [ShipmentController, OrganizationController],
    providers: [ShipmentService, OrganizationService],
    exports: [ShipmentService]
})
export class ShipmentsModule {}
