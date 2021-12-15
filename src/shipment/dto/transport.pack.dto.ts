import { ValidateNested } from "class-validator";
import { WeightDto } from "./weight.dto";

export class TransportPackDto {
    
    @ValidateNested()
    readonly nodes: WeightDto[];
}
