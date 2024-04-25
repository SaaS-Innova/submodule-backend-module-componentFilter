import { Resolver, Query, Mutation, Args, Info } from '@nestjs/graphql';
import { CompanyHasUserComponentFilterService } from './company-has-user-component-filter.service';
import { CompanyHasUserComponentFilter } from './entities/company-has-user-component-filter.entity';
import { CreateCompanyHasUserComponentFilterInput } from './dto/create-company-has-user-component-filter.input';
import { UpdateCompanyHasUserComponentFilterInput } from './dto/update-company-has-user-component-filter.input';
import { getAllRelations } from 'src/commons/graphql/helper';

@Resolver(() => CompanyHasUserComponentFilter)
export class CompanyHasUserComponentFilterResolver {
  constructor(
    private readonly companyHasUserComponentFilterService: CompanyHasUserComponentFilterService,
  ) {}

  @Query(() => [CompanyHasUserComponentFilter], {
    name: 'getAllCompanyHasUserComponentFilter',
  })
  findAll(@Info() info) {
    const relations = getAllRelations(info);
    const findManyOptions = {
      relations: relations,
    };
    return this.companyHasUserComponentFilterService.find(findManyOptions);
  }

  @Query(() => CompanyHasUserComponentFilter, {
    name: 'getCompanyHasUserComponentFilter',
  })
  findOne(@Args('id', { type: () => Number }) id: number, @Info() info) {
    const relations = getAllRelations(info);
    return this.companyHasUserComponentFilterService.findOne({
      where: { id },
      relations: relations,
    });
  }

  @Mutation(() => CompanyHasUserComponentFilter, { nullable: true })
  createCompanyHasUserComponentFilter(
    @Args('createCompanyHasUserComponentFilterInput')
    createCompanyHasUserComponentFilterInput: CreateCompanyHasUserComponentFilterInput,
    @Info() info,
  ) {
    const relations = getAllRelations(info);
    return this.companyHasUserComponentFilterService.create(
      createCompanyHasUserComponentFilterInput,
      relations,
    );
  }

  @Mutation(() => CompanyHasUserComponentFilter, { nullable: true })
  updateCompanyHasUserComponentFilter(
    @Args('updateCompanyHasUserComponentFilterInput')
    updateCompanyHasUserComponentFilterInput: UpdateCompanyHasUserComponentFilterInput,
    @Info() info,
  ) {
    const relations = getAllRelations(info);
    return this.companyHasUserComponentFilterService.update(
      updateCompanyHasUserComponentFilterInput.id,
      updateCompanyHasUserComponentFilterInput,
      relations,
    );
  }
}
