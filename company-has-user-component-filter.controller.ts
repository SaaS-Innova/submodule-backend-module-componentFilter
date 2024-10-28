import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { CompanyHasUserComponentFilterService } from "./company-has-user-component-filter.service";
import { ComponentFilter } from "./dto/component-filter.input";
import { CurrentUser } from "src/commons/decorator/current-user.decorator";
import { CurrentUserDto } from "src/commons/decorator/current-user.dto";

@ApiTags("component")
@ApiBearerAuth()
@Controller("component")
export class CompanyHasUserComponentFilterController {
  constructor(
    private companyHasUserComponentFilterService: CompanyHasUserComponentFilterService
  ) {}

  /**
   * Initializes component filter values for a user.
   *
   * This endpoint is used to set initial filter values for a component when
   * the component is first initiated. It requires the filter data and current
   * user information to associate filter values with the specific user.
   *
   * @param {ComponentFilter} data - The filter data for initializing component settings.
   * @param {CurrentUserDto} currentUser - The current user's data, including their company-user ID.
   * @returns {Promise<any>} - Result of the initialization process.
   */
  @Post("initiate-filter")
  setValueOnComponentInitiate(
    @Body() data: ComponentFilter,
    @CurrentUser() currentUser: CurrentUserDto
  ) {
    return this.companyHasUserComponentFilterService.setValueOnComponentInitiate(
      data,
      currentUser.company_has_user_id
    );
  }

  /**
   * Sets or updates filter values for a component.
   *
   * This endpoint is used to apply or update filter settings for a component
   * based on user input. It accepts filter data and user information to ensure
   * the filter settings are correctly applied to the specific user.
   *
   * @param {ComponentFilter} data - The filter data to set or update.
   * @param {CurrentUserDto} currentUser - The current user's data, including their company-user ID.
   * @returns {Promise<any>} - Result of the filter update operation.
   */
  @Post("filter")
  setComponentFilterValue(
    @Body() data: ComponentFilter,
    @CurrentUser() currentUser: CurrentUserDto
  ) {
    return this.companyHasUserComponentFilterService.setComponentFilterValue(
      data,
      currentUser.company_has_user_id
    );
  }

  /**
   * Retrieves the current filter values for a component.
   *
   * This endpoint fetches filter values for a component based on its name and type.
   * It also requires the current user information to ensure the correct filters
   * associated with that user are retrieved.
   *
   * @param {string} componentName - The name of the component to retrieve filters for.
   * @param {string} componentType - The type of the component to retrieve filters for.
   * @param {CurrentUserDto} currentUser - The current user's data, including their company-user ID.
   * @returns {Promise<any>} - The current filter values associated with the component.
   */
  @Get("filter")
  getComponentFilterValue(
    @Query("componentName") componentName: string,
    @Query("componentType") componentType: string,
    @CurrentUser() currentUser: CurrentUserDto
  ) {
    return this.companyHasUserComponentFilterService.getComponentFilterValue(
      componentName,
      componentType,
      currentUser.company_has_user_id
    );
  }
}
