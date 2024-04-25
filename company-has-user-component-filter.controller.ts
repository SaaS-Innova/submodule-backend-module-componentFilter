import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CompanyHasUserComponentFilterService } from './company-has-user-component-filter.service';
import { ComponentFilter } from './dto/component-filter.input';
import { CurrentUser } from 'src/commons/decorator/current-user.decorator';
import { CurrentUserDto } from 'src/commons/decorator/current-user.dto';

@ApiTags('component')
@ApiBearerAuth()
@Controller('component')
export class CompanyHasUserComponentFilterController {
  constructor(
    private companyHasUserComponentFilterService: CompanyHasUserComponentFilterService,
  ) {}

  @Post('initiate-filter')
  setValueOnComponentInitiate(
    @Body() data: ComponentFilter,
    @CurrentUser() currentUser: CurrentUserDto,
  ) {
    return this.companyHasUserComponentFilterService.setValueOnComponentInitiate(
      data,
      currentUser.company_has_user_id,
    );
  }

  @Post('filter')
  setComponentFilterValue(
    @Body() data: ComponentFilter,
    @CurrentUser() currentUser: CurrentUserDto,
  ) {
    return this.companyHasUserComponentFilterService.setComponentFilterValue(
      data,
      currentUser.company_has_user_id,
    );
  }

  @Get('filter')
  getComponentFilterValue(
    @Query('componentName') componentName: string,
    @Query('componentType') componentType: string,
    @CurrentUser() currentUser: CurrentUserDto,
  ) {
    return this.companyHasUserComponentFilterService.getComponentFilterValue(
      componentName,
      componentType,
      currentUser.company_has_user_id,
    );
  }
}
