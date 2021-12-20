import { Shipment } from "./entities/shipment";

export enum MessageTypeEnum { SHIPMENT = "SHIPMENT", ORGANIZATION = "ORGANIZATION" }
export enum MassEnum {
    KILOGRAMS = 'KILOGRAMS',
    GRAMS = 'GRAMS',
    POUNDS = 'POUNDS',
    OUNCES = 'OUNCES'
}

export const convertShipment = (toUnit: MassEnum, shipment: Shipment) => {
    return shipment.nodes
        .map(node => node.weight * conversionFactor(toUnit, node.weightUnit))
        .reduce((acc, scaledWeight) => acc + scaledWeight, 0);
}

export const conversionFactor = (toUnits: MassEnum, fromUnits: MassEnum) => {
    switch (toUnits) {
        case MassEnum.GRAMS: {
            return conversionFactorToGrams(fromUnits);
        }
        case MassEnum.KILOGRAMS: {
            return conversionFactorToKilograms(fromUnits);
        }
        case MassEnum.OUNCES: {
            return conversionFactorToOunces(fromUnits);
        }
        case MassEnum.POUNDS: {
            return conversionFactorToPounds(fromUnits);
        }
        default: {
            throw new Error(`conversion to ${toUnits} not implemented`)
        }
    }
}

export const conversionFactorToKilograms = (fromUnits: MassEnum) => {
    switch (fromUnits) {
        case MassEnum.GRAMS: {
            return 0.001;
        }
        case MassEnum.KILOGRAMS: {
            return 1;
        }
        case MassEnum.OUNCES: {
            return 0.028349;
        }
        case MassEnum.POUNDS: {
            return 0.453592;
        }
        default: {
            throw new Error(`conversion to ${fromUnits} not implemented`)
        }
    }
}

export const conversionFactorToGrams = (fromUnits: MassEnum) => {
    return conversionFactorToKilograms(fromUnits) * 1000;
}

export const conversionFactorToPounds = (fromUnits: MassEnum) => {
    return conversionFactorToKilograms(fromUnits) * 2.20462;
}

export const conversionFactorToOunces = (fromUnits: MassEnum) => {
    return conversionFactorToKilograms(fromUnits) * 35.274;
}