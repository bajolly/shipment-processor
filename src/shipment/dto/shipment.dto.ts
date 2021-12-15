import { Equals, IsDate, IsEnum, IsOptional, IsString, ValidateNested } from "class-validator";
import { MessageTypeEnum } from "../shipment.constants";
import { TransportPackDto } from "./transport.pack.dto";

export class ShipmentDto {
    
    @IsEnum(MessageTypeEnum)
    @Equals(MessageTypeEnum[MessageTypeEnum.SHIPMENT])
    readonly type: MessageTypeEnum;
    
    @IsString()
    readonly referenceId: string;

    @IsString({each : true})
    readonly organizations: string[];

    @IsDate()
    @IsOptional()
    readonly estimatedTimeArrival: Date;

    @ValidateNested()
    readonly transportPacks: TransportPackDto;
}
