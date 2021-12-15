import { IsNumber, IsString } from "class-validator";

export class WeightDto {
    
    @IsNumber()
    readonly weight : number;

    @IsString()
    readonly unit: string;
}
