import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { MaxLength, ValidateIf } from 'class-validator';
import { ResponseObject } from 'src/commons';
import { CompanyHasUser } from 'src/modules/company-has-user/entities/company-has-user.entity';

@Index(
  'unique_constraint',
  ['company_has_user_id', 'component_name', 'component_type'],
  { unique: true },
)
@Index('company_has_user_component_filter_pkey', ['id'], { unique: true })
@Entity('company_has_user_component_filter', { schema: 'public' })
@ObjectType()
export class CompanyHasUserComponentFilter extends ResponseObject {
  @Field(() => Int, {})
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Field(() => Int, {})
  @Column('integer', { name: 'company_has_user_id', unique: true })
  company_has_user_id: number;

  @Field(() => String, { nullable: true })
  @Column('bigint', { name: 'created', nullable: true })
  created: string | null;

  @Field(() => String, { nullable: true })
  @ValidateIf((val) => val.component_name !== null)
  @MaxLength(256)
  @Column('character varying', {
    name: 'component_name',
    nullable: true,
    unique: true,
    length: 256,
  })
  component_name: string | null;

  @Field(() => String, { nullable: true })
  @Column('simple-json', { name: 'component_value', nullable: true })
  component_value: string | null;

  @Field(() => String, { nullable: true })
  @ValidateIf((val) => val.component_type !== null)
  @MaxLength(256)
  @Column('character varying', {
    name: 'component_type',
    nullable: true,
    unique: true,
    length: 256,
  })
  component_type: string | null;

  @Field(() => CompanyHasUser)
  @ManyToOne(
    () => CompanyHasUser,
    (company_has_user) => company_has_user.company_has_user_component_filters,
  )
  @JoinColumn([{ name: 'company_has_user_id', referencedColumnName: 'id' }])
  company_has_user: CompanyHasUser;
}
