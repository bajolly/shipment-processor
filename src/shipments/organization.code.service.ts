import { Repository } from "typeorm";
import { OrganizationCode } from "./entities/organization-code";

export class OrganizationCodeService {
    protected async preloadOrganizationCodeByCode(code: string, organizationCodeRepository: Repository<OrganizationCode>): Promise<OrganizationCode> {
        const existingOrganizationCode = await organizationCodeRepository.findOne({ code });
        if (existingOrganizationCode) {
            return existingOrganizationCode;
        }
        return organizationCodeRepository.create({ code });
    }
}
