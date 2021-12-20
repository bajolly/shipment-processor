import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { OrganizationDto } from '../dto/organization.dto';
import { OrganizationService } from './organization.service';

@Controller(['organization', 'organizations'])
export class OrganizationController {

    private readonly logger: Logger = new Logger(OrganizationController.name);
    
    constructor(private readonly  organizationService: OrganizationService) {}
    
    @Post()
    organization(@Body() organizationDto: OrganizationDto)
    {
        this.logger.log(`isInstanceOf organizationDto ${organizationDto instanceof OrganizationDto}`)
        return this.organizationService.create(organizationDto);
    }

    @Get(':id')
    organizations(@Param('id') id: string)
    {
        this.logger.log(`id is type ${typeof id}`)
        return this.organizationService.findOne(id);
    }

}
