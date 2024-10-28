import { Resolver, Query, Mutation, Args, Info } from "@nestjs/graphql";
import { CompanyHasUserComponentFilterService } from "./company-has-user-component-filter.service";
import { CompanyHasUserComponentFilter } from "./entities/company-has-user-component-filter.entity";
import { CreateCompanyHasUserComponentFilterInput } from "./dto/create-company-has-user-component-filter.input";
import { UpdateCompanyHasUserComponentFilterInput } from "./dto/update-company-has-user-component-filter.input";
import { getAllRelations } from "src/commons/graphql/helper";

@Resolver(() => CompanyHasUserComponentFilter)
export class CompanyHasUserComponentFilterResolver {
  constructor(
    private readonly companyHasUserComponentFilterService: CompanyHasUserComponentFilterService
  ) {}

  /**
   * Retrieves all component filters.
   *
   * This query fetches all component filters, including optional related entities as specified.
   * Relations are extracted from GraphQL query info to include nested entities if requested.
   *
   * @param {GraphQLResolveInfo} info - GraphQL info object to determine requested relations.
   * @returns {Promise<CompanyHasUserComponentFilter[]>} - List of component filters.
   */
  @Query(() => [CompanyHasUserComponentFilter], {
    name: "getAllCompanyHasUserComponentFilter",
  })
  findAll(@Info() info) {
    const relations = getAllRelations(info);
    const findManyOptions = {
      relations: relations,
    };
    return this.companyHasUserComponentFilterService.find(findManyOptions);
  }

  /**
   * Retrieves a single component filter by ID.
   *
   * Fetches a component filter based on its unique ID, including optional related entities.
   * Relations are dynamically extracted from GraphQL query info.
   *
   * @param {number} id - The ID of the component filter.
   * @param {GraphQLResolveInfo} info - GraphQL info object to determine requested relations.
   * @returns {Promise<CompanyHasUserComponentFilter | null>} - The requested component filter or null if not found.
   */
  @Query(() => CompanyHasUserComponentFilter, {
    name: "getCompanyHasUserComponentFilter",
  })
  findOne(@Args("id", { type: () => Number }) id: number, @Info() info) {
    const relations = getAllRelations(info);
    return this.companyHasUserComponentFilterService.findOne({
      where: { id },
      relations: relations,
    });
  }

  /**
   * Creates a new component filter record.
   *
   * This mutation accepts input data to create a new component filter. It includes optional
   * related entities as specified by the client through GraphQL query info.
   *
   * @param {CreateCompanyHasUserComponentFilterInput} createCompanyHasUserComponentFilterInput - Data for the new component filter.
   * @param {GraphQLResolveInfo} info - GraphQL info object to determine requested relations.
   * @returns {Promise<CompanyHasUserComponentFilter | null>} - The created component filter or null if creation failed.
   */
  @Mutation(() => CompanyHasUserComponentFilter, { nullable: true })
  createCompanyHasUserComponentFilter(
    @Args("createCompanyHasUserComponentFilterInput")
    createCompanyHasUserComponentFilterInput: CreateCompanyHasUserComponentFilterInput,
    @Info() info
  ) {
    const relations = getAllRelations(info);
    return this.companyHasUserComponentFilterService.create(
      createCompanyHasUserComponentFilterInput,
      relations
    );
  }

  /**
   * Updates an existing component filter record.
   *
   * This mutation updates an existing component filter with provided data, including
   * optional related entities based on GraphQL query info.
   *
   * @param {UpdateCompanyHasUserComponentFilterInput} updateCompanyHasUserComponentFilterInput - Updated data for the component filter.
   * @param {GraphQLResolveInfo} info - GraphQL info object to determine requested relations.
   * @returns {Promise<CompanyHasUserComponentFilter | null>} - The updated component filter or null if update failed.
   */
  @Mutation(() => CompanyHasUserComponentFilter, { nullable: true })
  updateCompanyHasUserComponentFilter(
    @Args("updateCompanyHasUserComponentFilterInput")
    updateCompanyHasUserComponentFilterInput: UpdateCompanyHasUserComponentFilterInput,
    @Info() info
  ) {
    const relations = getAllRelations(info);
    return this.companyHasUserComponentFilterService.update(
      updateCompanyHasUserComponentFilterInput.id,
      updateCompanyHasUserComponentFilterInput,
      relations
    );
  }
}
