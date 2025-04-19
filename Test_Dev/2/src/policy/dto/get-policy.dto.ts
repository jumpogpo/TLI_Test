import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDefined, MinLength, MaxLength } from 'class-validator';

export class GetPolicyDto {
  @ApiProperty({
    description: 'The name of the insured',
    example: 'Mr. A1',
  })
  @MinLength(1, { message: 'insureName must not be empty' })
  @MaxLength(50, { message: 'insureName must not exceed 100 characters' })
  @IsString()
  @IsDefined()
  insureName: string;
}
