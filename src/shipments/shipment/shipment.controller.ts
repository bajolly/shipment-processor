import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { ShipmentDto } from '../dto/shipment.dto';
import { ShipmentService } from './shipment.service';

@Controller(['shipment', 'shipments'])
export class ShipmentController {

    private readonly logger: Logger = new Logger(ShipmentController.name);

    constructor(private readonly shipmentService: ShipmentService) { }
    
    @Post()
    shipment(@Body() shipmentDto: ShipmentDto) {
        this.logger.log(`isInstanceOf shipmentDto ${shipmentDto instanceof ShipmentDto}`)
        return this.shipmentService.create(shipmentDto);
    }

    @Get(':id')
    shipments(@Param('id') id: string)
    {
        this.logger.log(`id is type ${typeof id}`)
        return this.shipmentService.findOne(id);
    }
}