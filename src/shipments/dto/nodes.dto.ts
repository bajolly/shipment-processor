import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { TotalWeightDto } from "./total.weight.dto";

export class NodesDto {

    @ValidateNested()
    @Type(() => TotalWeightDto)
    totalWeight: TotalWeightDto;
}
