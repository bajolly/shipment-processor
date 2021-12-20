import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { NodesDto } from "./nodes.dto";

export class TransportPackDto {
    
    @ValidateNested()
    @Type(() => NodesDto)
    readonly nodes: NodesDto[];
}
