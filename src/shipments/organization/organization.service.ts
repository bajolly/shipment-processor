import { Scope, Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizationDto } from '../dto/organization.dto';
import { Organization } from '../entities/organization';
import { OrganizationCode } from '../entities/organization-code';
import { OrganizationCodeService } from '../organization.code.service';

@Injectable(({ scope: Scope.DEFAULT }))
export class OrganizationService extends OrganizationCodeService {
    constructor(
        @InjectRepository(Organization)
        private readonly organizationRepository: Repository<Organization>,
        @InjectRepository(OrganizationCode)
        private readonly organizationCodeRepository: Repository<OrganizationCode>,
    ) { super() }

    private readonly logger: Logger = new Logger(OrganizationService.name);

    async findOne(orgId: string,) {
        const organization = await this.findOrganization(orgId);
        if (!organization) {
            throw new NotFoundException(`Shipment #${orgId} not found`);
        }
        return organization;
    }

    async create(organizationDto: OrganizationDto) {

        //to keep from throwing error.  
        //TODO implement an update method
        const existingOrganization = await this.findOrganization(organizationDto.id);

        if (existingOrganization) {
            this.logger.warn(`Organization ${organizationDto.id} already exists returning existing instance`)
            return existingOrganization;
        }

        const code = await this.preloadOrganizationCodeByCode(organizationDto.code, this.organizationCodeRepository)

        const organization = this.organizationRepository.create({
            orgId: organizationDto.id,
            code: code,
        })

        return this.organizationRepository.save(organization);
    }


    private async findOrganization(orgId: string)
    {
        return this.organizationRepository.findOne(
            {
                where: { orgId: orgId },

                relations: ['code'],
            }
        );
    }
}
