import { dataSource } from 'src/core/data-source';
import { CompanyHasUserComponentFilter } from '../entities/company-has-user-component-filter.entity';

export const companyHasUserComponentFilterRepository = dataSource.getRepository(
  CompanyHasUserComponentFilter,
);
