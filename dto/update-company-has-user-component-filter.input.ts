import { CreateCompanyHasUserComponentFilterInput } from './create-company-has-user-component-filter.input';
import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCompanyHasUserComponentFilterInput extends PartialType(
  CreateCompanyHasUserComponentFilterInput,
) {
  @Field(() => Int)
  id: number;
}
