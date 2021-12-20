import { IsEnum, IsNumber } from "class-validator";
import { MassEnum } from "../shipments.constants";

export class TotalWeightDto {
    
    @IsNumber()
    readonly weight: number;

    @IsEnum(MassEnum)
    readonly unit: string;
}
