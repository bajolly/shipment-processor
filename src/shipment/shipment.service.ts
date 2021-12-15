import { Injectable } from '@nestjs/common';
import { ShipmentDto } from './dto/shipment.dto';

@Injectable()
export class ShipmentService {
    
    shipment(shipmentDto: ShipmentDto)
    {
        return shipmentDto;
    }

    
}
