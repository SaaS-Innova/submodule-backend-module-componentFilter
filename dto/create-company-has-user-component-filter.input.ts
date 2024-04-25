import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCompanyHasUserComponentFilterInput {
  @Field(() => Int)
  company_has_user_id: number;

  @Field(() => String, { nullable: true })
  component_name: string | null;

  @Field(() => String, { nullable: true })
  component_value: string | null;

  @Field(() => String, { nullable: true })
  component_type: string | null;
}
