import { Injectable } from "@nestjs/common";
import { companyHasUserComponentFilterRepository } from "./repository/company-has-user-component-filter.repository";
import { CompanyHasUserComponentFilter } from "./entities/company-has-user-component-filter.entity";
import { CreateCompanyHasUserComponentFilterInput } from "./dto/create-company-has-user-component-filter.input";
import { UpdateCompanyHasUserComponentFilterInput } from "./dto/update-company-has-user-component-filter.input";
import { ComponentFilter } from "./dto/component-filter.input";
import { AbstractService, ResponseMsgService } from "src/commons";
import { DATA_BASE_ERROR_CODE } from "src/commons/constant";

@Injectable()
export class CompanyHasUserComponentFilterService extends AbstractService {
  constructor(protected responseMsgService: ResponseMsgService) {
    super(companyHasUserComponentFilterRepository, responseMsgService);
  }

  /**
   * Creates a new component filter record.
   *
   * Accepts data to create a new component filter record in the database.
   * Optionally, relationships can be loaded as specified.
   *
   * @param {CreateCompanyHasUserComponentFilterInput} data - The data for creating a component filter.
   * @param {string[]} [relations=null] - Optional array of relations to include.
   * @returns {Promise<CompanyHasUserComponentFilter | boolean>} - The created component filter or false if unsuccessful.
   */
  async create(
    data: CreateCompanyHasUserComponentFilterInput,
    relations: string[] = null
  ): Promise<CompanyHasUserComponentFilter | boolean> {
    const create = this.abstractCreate(data, relations);
    return create;
  }

  /**
   * Updates an existing component filter record.
   *
   * Finds and updates a component filter by its ID with provided data and
   * optional relationships to include.
   *
   * @param {number} id - The ID of the component filter to update.
   * @param {UpdateCompanyHasUserComponentFilterInput} data - The new data to apply.
   * @param {string[]} [relations=null] - Optional array of relations to include.
   * @returns {Promise<CompanyHasUserComponentFilter | boolean>} - The updated component filter or false if unsuccessful.
   */
  async update(
    id: number,
    data: UpdateCompanyHasUserComponentFilterInput,
    relations: string[] = null
  ): Promise<CompanyHasUserComponentFilter | boolean> {
    const update = this.abstractUpdate(id, data, relations);
    return update;
  }

  /**
   * Retrieves the current filter value for a specific component.
   *
   * Fetches the stored filter value for a given component name and type,
   * associated with a particular user.
   *
   * @param {string} componentName - The name of the component.
   * @param {string} componentType - The type of the component.
   * @param {number} companyHasUser - The ID of the user associated with the filter.
   * @returns {Promise<any>} - The component's filter value or null if not found.
   */
  async getComponentFilterValue(
    componentName: string,
    componentType: string,
    companyHasUser: number
  ) {
    const filter = await this.findOne({
      where: {
        component_name: componentName,
        component_type: componentType,
        company_has_user_id: companyHasUser,
      },
    });
    if (filter) {
      return filter.component_value;
    } else {
      return null;
    }
  }

  /**
   * Updates a component filter's value.
   *
   * Checks if a filter record already exists for the given component name, type, and user.
   * If it exists, updates it with new data; otherwise, returns false.
   *
   * @param {ComponentFilter} data - The new filter data.
   * @param {number} companyHasUser - The ID of the user associated with the filter.
   * @returns {Promise<CompanyHasUserComponentFilter | boolean>} - The updated component filter or false if not found.
   */
  async updateComponentFilterValue(
    data: ComponentFilter,
    companyHasUser: number
  ): Promise<CompanyHasUserComponentFilter | boolean> {
    const existRecord = await this.findOne({
      where: {
        component_name: data.component_name,
        component_type: data.component_type,
        company_has_user_id: companyHasUser,
      },
    });
    if (existRecord) {
      const updateRecord = await this.update(existRecord.id, {
        ...existRecord,
        ...data,
      });
      return updateRecord;
    } else {
      return false;
    }
  }

  /**
   * Sets or creates a component filter value.
   *
   * Attempts to update an existing component filter with new data. If no record is found,
   * it creates a new component filter for the specified user.
   *
   * @param {ComponentFilter} data - The filter data to set or create.
   * @param {number} companyHasUser - The ID of the user associated with the filter.
   * @returns {Promise<CompanyHasUserComponentFilter | boolean>} - The updated or newly created component filter.
   */
  async setComponentFilterValue(data: ComponentFilter, companyHasUser: number) {
    const updateRecord = await this.updateComponentFilterValue(
      data,
      companyHasUser
    );

    if (updateRecord === false) {
      try {
        const createRecord = await this.create({
          ...data,
          company_has_user_id: companyHasUser,
        });
        return createRecord;
      } catch (e) {
        //dataBase error
        //'Key (company_has_user_id, component_name, component_type)=(companyHasUser, component_name, component_type) already exists
        if (e.code === DATA_BASE_ERROR_CODE.UNIQUE_CONSTRAINT) {
          const updateRecord = await this.updateComponentFilterValue(
            data,
            companyHasUser
          );
          return updateRecord;
        }
      }
    }
    return updateRecord;
  }

  /**
   * Initializes component filter values upon component initiation.
   *
   * Checks if a filter already exists for the component and user. If it does, it returns
   * the current filter value. If not, it creates a new filter with the provided data.
   *
   * @param {ComponentFilter} data - The initial filter data for the component.
   * @param {number} companyHasUser - The ID of the user associated with the filter.
   * @returns {Promise<any>} - The component's filter value.
   */
  async setValueOnComponentInitiate(
    data: ComponentFilter,
    companyHasUser: number
  ) {
    const previousComponentFilter = await this.findOne({
      where: {
        component_name: data.component_name,
        component_type: data.component_type,
        company_has_user_id: companyHasUser,
      },
    });

    if (!previousComponentFilter) {
      await this.create({
        ...data,
        company_has_user_id: companyHasUser,
      });
      return data.component_value;
    } else {
      return previousComponentFilter.component_value;
    }
  }

  /**
   * Updates component filter based on input data and relationships.
   *
   * Executes an update on a component filter record by its ID, using the provided data.
   * Optionally includes specific relationships.
   *
   * @param {number} id - The ID of the component filter to update.
   * @param {UpdateCompanyHasUserComponentFilterInput} data - Data for the update.
   * @param {string[]} [relations=null] - Optional array of relations to include.
   * @returns {Promise<CompanyHasUserComponentFilter | boolean>} - The updated component filter or false if unsuccessful.
   */
  async getComponentFilter(
    id: number,
    data: UpdateCompanyHasUserComponentFilterInput,
    relations: string[] = null
  ): Promise<CompanyHasUserComponentFilter | boolean> {
    const update = this.abstractUpdate(id, data, relations);
    return update;
  }
}
