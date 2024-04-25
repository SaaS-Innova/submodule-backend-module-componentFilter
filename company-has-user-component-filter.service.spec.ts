import { Test, TestingModule } from '@nestjs/testing';
import { CompanyHasUserComponentFilterService } from './company-has-user-component-filter.service';

describe('CompanyHasUserComponentFilterService', () => {
  let service: CompanyHasUserComponentFilterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyHasUserComponentFilterService],
    }).compile();

    service = module.get<CompanyHasUserComponentFilterService>(
      CompanyHasUserComponentFilterService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
