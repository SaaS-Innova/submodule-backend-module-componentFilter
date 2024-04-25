import { Module } from '@nestjs/common';
import { CompanyHasUserComponentFilterService } from './company-has-user-component-filter.service';
import { CompanyHasUserComponentFilterResolver } from './company-has-user-component-filter.resolver';
import { CompanyHasUserComponentFilterController } from './company-has-user-component-filter.controller';
import { ResponseMsgService } from 'src/commons';

@Module({
  providers: [
    CompanyHasUserComponentFilterResolver,
    CompanyHasUserComponentFilterService,
    ResponseMsgService,
  ],
  controllers: [CompanyHasUserComponentFilterController],
  exports: [CompanyHasUserComponentFilterService, ResponseMsgService],
})
export class CompanyHasUserComponentFilterModule {}
