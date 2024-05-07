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

  async create(
    data: CreateCompanyHasUserComponentFilterInput,
    relations: string[] = null
  ): Promise<CompanyHasUserComponentFilter | boolean> {
    const create = this.abstractCreate(data, relations);
    return create;
  }

  async update(
    id: number,
    data: UpdateCompanyHasUserComponentFilterInput,
    relations: string[] = null
  ): Promise<CompanyHasUserComponentFilter | boolean> {
    const update = this.abstractUpdate(id, data, relations);
    return update;
  }

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

  async getComponentFilter(
    id: number,
    data: UpdateCompanyHasUserComponentFilterInput,
    relations: string[] = null
  ): Promise<CompanyHasUserComponentFilter | boolean> {
    const update = this.abstractUpdate(id, data, relations);
    return update;
  }
}
