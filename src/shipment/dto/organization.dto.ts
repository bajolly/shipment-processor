import { Equals, IsEnum, IsString } from "class-validator";
import { MessageTypeEnum } from "../shipment.constants";

export class OrganizationDto {

    @IsEnum(MessageTypeEnum)
    @Equals(MessageTypeEnum[MessageTypeEnum.ORGANIZATION])
    readonly type: string;

    @IsString()
    readonly id: string;

    @IsString()
    readonly code: string;
}
