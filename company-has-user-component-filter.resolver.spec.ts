import { Test, TestingModule } from '@nestjs/testing';
import { CompanyHasUserComponentFilterResolver } from './company-has-user-component-filter.resolver';
import { CompanyHasUserComponentFilterService } from './company-has-user-component-filter.service';

describe('CompanyHasUserComponentFilterResolver', () => {
  let resolver: CompanyHasUserComponentFilterResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyHasUserComponentFilterResolver,
        CompanyHasUserComponentFilterService,
      ],
    }).compile();

    resolver = module.get<CompanyHasUserComponentFilterResolver>(
      CompanyHasUserComponentFilterResolver,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
