import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ComponentFilter {
  @ApiProperty()
  @IsOptional()
  component_name: string;

  @ApiProperty()
  @IsOptional()
  component_value: string;

  @ApiProperty()
  @IsOptional()
  component_type: string;
}
